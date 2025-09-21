import fetch from 'node-fetch';

interface VideoGenerationRequest {
  avatarType: 'nolly' | 'pablo' | 'both';
  scene: 'entrance' | 'presentation' | 'celebration';
  music: 'zarathustra' | 'william_tell' | 'pomp_circumstance' | 'custom_fanfare';
  script: string;
  crowdLevel: 'moderate' | 'loud' | 'thunderous';
}

interface HeyGenResponse {
  video_id: string;
  status: string;
  video_url?: string;
}

interface TavusResponse {
  video_id: string;
  status: string;
  download_url?: string;
}

// Avatar configurations for the Santiago Team
const AVATAR_CONFIGS = {
  nolly: {
    heygen_avatar_id: 'nolly_santiago_avatar', // Replace with actual HeyGen avatar ID
    tavus_persona_id: 'nolly_santiago_persona', // Replace with actual Tavus persona ID
    name: 'Nolly Santiago',
    role: 'Family Legacy Leader'
  },
  pablo: {
    heygen_avatar_id: 'pablo_santiago_avatar', // Replace with actual HeyGen avatar ID  
    tavus_persona_id: 'pablo_santiago_persona', // Replace with actual Tavus persona ID
    name: 'Pablo Santiago',
    role: 'Law Enforcement Veteran'
  }
};

// Scene templates with camera movements and backgrounds
const SCENE_TEMPLATES = {
  entrance: {
    description: 'Grand entrance walking into cheering room',
    background: 'luxury_conference_room_with_crowd',
    camera_movement: 'dramatic_approach_from_behind',
    crowd_audio: true
  },
  presentation: {
    description: 'Professional stage presentation',
    background: 'corporate_stage_with_audience',
    camera_movement: 'confident_center_stage',
    crowd_audio: true
  },
  celebration: {
    description: 'Victory celebration with team',
    background: 'celebration_hall_with_confetti',
    camera_movement: 'triumphant_360_view',
    crowd_audio: true
  }
};

// Background music mapping (all royalty-free/public domain)
const MUSIC_TRACKS = {
  zarathustra: {
    name: 'Also sprach Zarathustra',
    description: '2001 Space Odyssey theme - Epic and cosmic',
    file_url: '/assets/audio/also-sprach-zarathustra.mp3',
    duration: 120
  },
  william_tell: {
    name: 'William Tell Overture',
    description: 'Lone Ranger theme - Building excitement',
    file_url: '/assets/audio/william-tell-overture.mp3',
    duration: 180
  },
  pomp_circumstance: {
    name: 'Pomp and Circumstance',
    description: 'Graduation ceremony classic',
    file_url: '/assets/audio/pomp-and-circumstance.mp3',
    duration: 150
  },
  custom_fanfare: {
    name: 'Santiago Team Victory Fanfare',
    description: 'Custom orchestral celebration',
    file_url: '/assets/audio/santiago-victory-fanfare.mp3',
    duration: 90
  }
};

export class VideoGenerationService {
  private heygenApiKey: string;
  private tavusApiKey: string;

  constructor() {
    this.heygenApiKey = process.env.HEYGEN_API_KEY!;
    this.tavusApiKey = process.env.TAVUS_API_KEY!;
    
    if (!this.heygenApiKey || !this.tavusApiKey) {
      throw new Error('Missing video generation API keys');
    }
  }

  async generateEpicVideo(request: VideoGenerationRequest): Promise<{ videoId: string; status: string }> {
    console.log('🎬 Generating epic video with request:', request);

    try {
      // Try HeyGen first (generally better for professional avatars)
      const heygenResult = await this.generateWithHeyGen(request);
      if (heygenResult.success) {
        return { videoId: heygenResult.videoId, status: 'generating' };
      }

      // Fallback to Tavus
      console.log('🔄 HeyGen failed, trying Tavus...');
      const tavusResult = await this.generateWithTavus(request);
      if (tavusResult.success) {
        return { videoId: tavusResult.videoId, status: 'generating' };
      }

      throw new Error('Both video generation services failed');
    } catch (error) {
      console.error('❌ Video generation error:', error);
      throw error;
    }
  }

  private async generateWithHeyGen(request: VideoGenerationRequest): Promise<{ success: boolean; videoId: string }> {
    try {
      const sceneTemplate = SCENE_TEMPLATES[request.scene];
      const musicTrack = MUSIC_TRACKS[request.music];

      // Build the HeyGen request payload
      const payload = {
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: request.avatarType === 'both' 
                ? AVATAR_CONFIGS.nolly.heygen_avatar_id 
                : AVATAR_CONFIGS[request.avatarType].heygen_avatar_id
            },
            voice: {
              type: "text",
              input_text: this.enhanceScriptForScene(request.script, request.scene, request.avatarType)
            },
            background: {
              type: "template",
              template_id: sceneTemplate.background
            }
          }
        ],
        callback_id: `santiago_epic_${Date.now()}`,
        settings: {
          quality: "1080p",
          ratio: "16:9",
          background_music: {
            url: musicTrack.file_url,
            volume: request.crowdLevel === 'thunderous' ? 0.3 : 0.5 // Lower music when crowd is loud
          },
          ambient_audio: {
            crowd_cheering: this.getCrowdAudioLevel(request.crowdLevel)
          }
        }
      };

      const response = await fetch('https://api.heygen.com/v2/video/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.heygenApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('HeyGen API error:', error);
        return { success: false, videoId: '' };
      }

      const result = await response.json() as HeyGenResponse;
      console.log('✅ HeyGen video initiated:', result.video_id);
      
      return { success: true, videoId: result.video_id };
    } catch (error) {
      console.error('HeyGen generation failed:', error);
      return { success: false, videoId: '' };
    }
  }

  private async generateWithTavus(request: VideoGenerationRequest): Promise<{ success: boolean; videoId: string }> {
    try {
      const sceneTemplate = SCENE_TEMPLATES[request.scene];
      const musicTrack = MUSIC_TRACKS[request.music];

      const payload = {
        replica_id: request.avatarType === 'both' 
          ? AVATAR_CONFIGS.nolly.tavus_persona_id 
          : AVATAR_CONFIGS[request.avatarType].tavus_persona_id,
        script: this.enhanceScriptForScene(request.script, request.scene, request.avatarType),
        background: {
          type: "template",
          template: sceneTemplate.background
        },
        audio: {
          background_music: musicTrack.file_url,
          ambient_sounds: this.getCrowdAudioLevel(request.crowdLevel)
        },
        properties: {
          quality: "1080p",
          aspect_ratio: "16:9"
        }
      };

      const response = await fetch('https://api.tavus.io/v2/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tavusApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Tavus API error:', error);
        return { success: false, videoId: '' };
      }

      const result = await response.json() as TavusResponse;
      console.log('✅ Tavus video initiated:', result.video_id);
      
      return { success: true, videoId: result.video_id };
    } catch (error) {
      console.error('Tavus generation failed:', error);
      return { success: false, videoId: '' };
    }
  }

  private enhanceScriptForScene(script: string, scene: string, avatarType: string): string {
    const sceneIntros = {
      entrance: avatarType === 'both' 
        ? "Ladies and gentlemen, the Santiago Team has arrived. " 
        : `Ladies and gentlemen, ${AVATAR_CONFIGS[avatarType as keyof typeof AVATAR_CONFIGS]?.name} has arrived. `,
      presentation: "Thank you for that incredible welcome. ",
      celebration: "We did it! This moment represents everything we've worked for. "
    };

    const avatarContext = avatarType === 'both'
      ? "Together, Nolly and Pablo Santiago represent four generations of service and innovation. "
      : avatarType === 'nolly'
        ? "With a background in telecommunications and a passion for financial education, "
        : "With over 30 years in law enforcement and a mission to protect families, ";

    return `${sceneIntros[scene as keyof typeof sceneIntros]}${avatarContext}${script}`;
  }

  private getCrowdAudioLevel(crowdLevel: string): string {
    switch (crowdLevel) {
      case 'moderate': return 'polite_applause';
      case 'loud': return 'enthusiastic_cheering';
      case 'thunderous': return 'stadium_roar';
      default: return 'enthusiastic_cheering';
    }
  }

  async checkVideoStatus(videoId: string): Promise<{ status: string; videoUrl?: string }> {
    // Check HeyGen first
    try {
      const heygenResponse = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        headers: {
          'Authorization': `Bearer ${this.heygenApiKey}`
        }
      });

      if (heygenResponse.ok) {
        const result = await heygenResponse.json() as HeyGenResponse;
        return {
          status: result.status,
          videoUrl: result.video_url
        };
      }
    } catch (error) {
      console.error('Error checking HeyGen status:', error);
    }

    // Check Tavus
    try {
      const tavusResponse = await fetch(`https://api.tavus.io/v2/videos/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${this.tavusApiKey}`
        }
      });

      if (tavusResponse.ok) {
        const result = await tavusResponse.json() as TavusResponse;
        return {
          status: result.status,
          videoUrl: result.download_url
        };
      }
    } catch (error) {
      console.error('Error checking Tavus status:', error);
    }

    return { status: 'error' };
  }
}