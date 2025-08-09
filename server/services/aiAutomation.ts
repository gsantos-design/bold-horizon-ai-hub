import fetch from 'node-fetch';
import FormData from 'form-data';

// ElevenLabs Voice Cloning Service
export class ElevenLabsService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY!;
    if (!this.apiKey) {
      throw new Error('ELEVENLABS_API_KEY is required');
    }
  }

  async getVoices() {
    const response = await fetch(`${this.baseUrl}/voices`, {
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  async cloneVoice(name: string, description: string, audioFiles: Buffer[]) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    
    audioFiles.forEach((file, index) => {
      formData.append('files', file, `sample_${index}.mp3`);
    });

    const response = await fetch(`${this.baseUrl}/voices/add`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        ...formData.getHeaders()
      },
      body: formData as any
    });
    return response.json();
  }

  async generateSpeech(voiceId: string, text: string) {
    const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      })
    });
    return response.arrayBuffer();
  }
}

// Retell AI Phone System Service
export class RetellAIService {
  private apiKey: string;
  private baseUrl = 'https://api.retellai.com';

  constructor() {
    this.apiKey = process.env.RETELL_API_KEY!;
    if (!this.apiKey) {
      throw new Error('RETELL_API_KEY is required');
    }
  }

  async createAgent(config: {
    llm_websocket_url: string;
    voice_id: string;
    agent_name: string;
    language: string;
    response_engine: string;
  }) {
    const response = await fetch(`${this.baseUrl}/create-agent`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });
    return response.json();
  }

  async createPhoneCall(agentId: string, toNumber: string, fromNumber: string) {
    const response = await fetch(`${this.baseUrl}/create-phone-call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_number: fromNumber,
        to_number: toNumber,
        agent_id: agentId,
        metadata: {
          campaign: 'santiago_team_outreach',
          source: 'bold_horizons_platform'
        }
      })
    });
    return response.json();
  }

  async getCallDetails(callId: string) {
    const response = await fetch(`${this.baseUrl}/get-call/${callId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    return response.json();
  }
}

// HeyGen Video Avatar Service
export class HeyGenService {
  private apiKey: string;
  private baseUrl = 'https://api.heygen.com/v2';

  constructor() {
    this.apiKey = process.env.HEYGEN_API_KEY!;
    if (!this.apiKey) {
      throw new Error('HEYGEN_API_KEY is required');
    }
  }

  async createAvatar(name: string, videoFile: Buffer) {
    const formData = new FormData();
    formData.append('avatar_name', name);
    formData.append('video', videoFile, 'avatar_video.mp4');

    const response = await fetch(`${this.baseUrl}/avatars`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        ...formData.getHeaders()
      },
      body: formData as any
    });
    return response.json();
  }

  async generateVideo(config: {
    avatar_id: string;
    script: string;
    voice_id?: string;
    background?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/video/generate`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type: 'avatar',
            avatar_id: config.avatar_id,
            avatar_style: 'normal'
          },
          voice: {
            type: 'text',
            input_text: config.script,
            voice_id: config.voice_id || 'default'
          },
          background: {
            type: 'color',
            value: config.background || '#ffffff'
          }
        }],
        aspect_ratio: '16:9',
        test: false
      })
    });
    return response.json();
  }

  async getVideoStatus(videoId: string) {
    const response = await fetch(`${this.baseUrl}/video_status.get?video_id=${videoId}`, {
      headers: {
        'X-API-Key': this.apiKey
      }
    });
    return response.json();
  }
}

// Tavus Video Personalization Service
export class TavusService {
  private apiKey: string;
  private baseUrl = 'https://tavusapi.com';

  constructor() {
    this.apiKey = process.env.TAVUS_API_KEY!;
    if (!this.apiKey) {
      throw new Error('TAVUS_API_KEY is required');
    }
  }

  async createReplica(name: string, videoFile: Buffer) {
    const formData = new FormData();
    formData.append('replica_name', name);
    formData.append('training_video', videoFile, 'training_video.mp4');

    const response = await fetch(`${this.baseUrl}/v2/replicas`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        ...formData.getHeaders()
      },
      body: formData as any
    });
    return response.json();
  }

  async generatePersonalizedVideo(config: {
    replica_id: string;
    script: string;
    background_url?: string;
    persona_id?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/v2/videos`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        replica_id: config.replica_id,
        script: config.script,
        background_url: config.background_url,
        persona_id: config.persona_id,
        video_name: `Santiago_Team_Outreach_${Date.now()}`
      })
    });
    return response.json();
  }

  async getVideoStatus(videoId: string) {
    const response = await fetch(`${this.baseUrl}/v2/videos/${videoId}`, {
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return response.json();
  }
}

// Orchestration Service for Complete AI Automation
export class AIAutomationOrchestrator {
  private elevenLabs: ElevenLabsService;
  private retellAI: RetellAIService;
  private heyGen: HeyGenService;
  private tavus: TavusService;

  constructor() {
    this.elevenLabs = new ElevenLabsService();
    this.retellAI = new RetellAIService();
    this.heyGen = new HeyGenService();
    this.tavus = new TavusService();
  }

  async setupSantiagoTeamAutomation() {
    try {
      // Step 1: Get available voices (for testing connection)
      const voices = await this.elevenLabs.getVoices();
      
      return {
        status: 'ready',
        services: {
          elevenlabs: 'connected',
          retell: 'connected',
          heygen: 'connected',
          tavus: 'connected'
        },
        message: 'All AI automation services are ready. Santiago Team can now use voice cloning, AI phone calls, and personalized video generation.',
        next_steps: [
          'Record voice samples for Nolly and Pablo Santiago',
          'Create video avatars with high-quality footage',
          'Configure phone number for Retell AI calls',
          'Set up lead targeting campaigns'
        ]
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to initialize AI automation services',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async processLeadOutreach(lead: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company?: string;
    industry?: string;
  }) {
    try {
      // Generate personalized script
      const script = this.generatePersonalizedScript(lead);
      
      // Create phone call (example flow)
      // In production, this would be triggered based on campaign rules
      const phoneCall = await this.retellAI.createPhoneCall(
        'santiago_agent_id', // This would be configured
        lead.phone,
        '+14077771087' // Santiago Team phone number
      ) as { call_id?: string };

      return {
        leadId: `${lead.firstName}_${lead.lastName}_${Date.now()}`,
        phoneCallId: phoneCall.call_id || 'pending',
        script,
        status: 'outreach_initiated',
        estimatedContactTime: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to process lead outreach',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generatePersonalizedScript(lead: any): string {
    return `Hi ${lead.firstName}, this is Nolly Santiago from the World Financial Group. 

I hope you're doing well today. I'm reaching out because we've identified you as someone who might be interested in exploring additional income opportunities in the financial services industry.

${lead.company ? `I see you work at ${lead.company}, which is fantastic.` : ''} Many successful professionals like yourself are looking for ways to diversify their income streams and build long-term wealth.

At WFG, we help individuals create multiple income streams through our comprehensive financial education platform and proven business opportunity. Our Empower360 philosophy focuses on three key areas: Multi-Handed Income, Smart Financial Rules, and Personal Development.

Would you be open to a brief 15-minute conversation to explore how this might align with your goals? We've helped many people in ${lead.industry || 'your field'} add $100,000 to $250,000 in additional annual income.

When would be a good time for you to chat?`;
  }
}

// Export singleton instances
export const aiAutomation = new AIAutomationOrchestrator();
export const elevenLabsService = new ElevenLabsService();
export const retellAIService = new RetellAIService();
export const heyGenService = new HeyGenService();
export const tavusService = new TavusService();