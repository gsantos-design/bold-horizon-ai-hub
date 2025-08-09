import express from 'express';

// AI Phone Calling Integration with Retell AI + ElevenLabs
export class AIPhoneService {
  private retellApiKey: string;
  private elevenLabsApiKey: string;

  constructor(retellApiKey: string, elevenLabsApiKey: string) {
    this.retellApiKey = retellApiKey;
    this.elevenLabsApiKey = elevenLabsApiKey;
  }

  // Voice cloning setup for Nolly and Pablo Santiago
  async createVoiceClone(name: string, audioSamples: string[]) {
    // ElevenLabs Voice Cloning API integration
    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': this.elevenLabsApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: `Voice clone for ${name} - Santiago Team WFG`,
        files: audioSamples
      })
    });
    return response.json();
  }

  // Initiate AI phone call
  async makeAICall(phoneNumber: string, script: string, voiceId: string) {
    // Retell AI Phone Call API integration
    const response = await fetch('https://api.retellai.com/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.retellApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_number: process.env.TWILIO_PHONE_NUMBER, // Santiago Team phone number
        to_number: phoneNumber,
        agent_id: voiceId,
        custom_prompt: script,
        metadata: {
          campaign: 'santiago-team-outreach',
          territory: 'florida-newyork'
        }
      })
    });
    return response.json();
  }

  // Batch phone call campaign
  async launchPhoneCampaign(leads: any[], campaignType: string) {
    const results = [];
    
    for (const lead of leads) {
      const personalizedScript = this.generatePersonalizedScript(lead, campaignType);
      const voiceId = lead.preferredAgent === 'pablo' ? 'pablo-voice-id' : 'nolly-voice-id';
      
      const callResult = await this.makeAICall(lead.phoneNumber, personalizedScript, voiceId);
      results.push({
        leadId: lead.id,
        callId: callResult.call_id,
        status: callResult.status
      });
      
      // Rate limiting - space out calls
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    return results;
  }

  private generatePersonalizedScript(lead: any, campaignType: string): string {
    const scripts = {
      '401k': `Hi ${lead.firstName}, this is ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago from the Santiago Team at World Financial Group. I'm calling because you expressed interest in learning about tax-free rollover strategies for your 401k. Based on your background in ${lead.industry}, I believe you'd benefit from our specialized approach that could potentially save you thousands in taxes while securing your retirement. Do you have a few minutes to discuss how this could work for your specific situation?`,
      
      'high-yield': `Hello ${lead.firstName}, this is ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago calling from the Santiago Team. I understand you're looking for higher yield alternatives to traditional CDs and savings accounts. We're currently offering our clients access to products yielding 4.5% to 6.8% with principal protection - significantly higher than what banks are offering. Given your financial goals, this could be exactly what you're looking for. Would you like to learn more about how this works?`,
      
      'entrepreneur': `Hi ${lead.firstName}, this is ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago with the Santiago Team at WFG. I'm reaching out because successful ${lead.jobTitle}s like yourself are often looking for ways to multiply their income beyond their primary business. We help entrepreneurs create an additional $100k to $250k annually through our proven multi-handed income system. Based on your experience in ${lead.industry}, you'd be perfect for our entrepreneur program. Do you have 5 minutes to hear how this could work for you?`
    };
    
    return scripts[campaignType] || scripts['entrepreneur'];
  }
}

// AI Video Avatar Integration with HeyGen + Tavus
export class AIVideoService {
  private heygenApiKey: string;
  private tavusApiKey: string;

  constructor(heygenApiKey: string, tavusApiKey: string) {
    this.heygenApiKey = heygenApiKey;
    this.tavusApiKey = tavusApiKey;
  }

  // Create avatar from training video
  async createAvatar(name: string, videoUrl: string) {
    // Tavus Avatar Creation API
    const response = await fetch('https://tavus.io/api/v2/avatars', {
      method: 'POST',
      headers: {
        'x-api-key': this.tavusApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar_name: name,
        training_video_url: videoUrl,
        consent_statement: "I consent to creating a digital avatar from this video"
      })
    });
    return response.json();
  }

  // Generate personalized video
  async generatePersonalizedVideo(leadData: any, avatarId: string, campaignType: string) {
    const script = this.generatePersonalizedVideoScript(leadData, campaignType);
    
    // HeyGen Video Generation API
    const response = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'X-API-KEY': this.heygenApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type: 'avatar',
            avatar_id: avatarId
          },
          voice: {
            type: 'text',
            input_text: script
          }
        }],
        dimension: {
          width: 1920,
          height: 1080
        },
        aspect_ratio: '16:9'
      })
    });
    return response.json();
  }

  // Batch video generation for email campaigns
  async launchVideoCampaign(leads: any[], campaignType: string) {
    const results = [];
    
    for (const lead of leads) {
      const avatarId = lead.preferredAgent === 'pablo' ? 'pablo-avatar-id' : 'nolly-avatar-id';
      
      const videoResult = await this.generatePersonalizedVideo(lead, avatarId, campaignType);
      results.push({
        leadId: lead.id,
        videoId: videoResult.video_id,
        status: videoResult.status,
        downloadUrl: videoResult.video_url
      });
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    return results;
  }

  private generatePersonalizedVideoScript(lead: any, campaignType: string): string {
    const scripts = {
      'email-followup': `Hi ${lead.firstName}, I'm ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago, and I wanted to personally follow up on the information you requested about our ${lead.interestedService}. I noticed you work in ${lead.industry} - that's fantastic! We've helped many professionals in your field achieve their financial goals. I'd love to schedule a brief call to discuss how our ${lead.interestedService} program could specifically benefit someone in your position. You can book a time that works for you using the link below, or simply reply to this email. Looking forward to speaking with you soon!`,
      
      'linkedin-outreach': `Hello ${lead.firstName}, I'm ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago from the Santiago Team at World Financial Group. I came across your profile and was impressed by your background as a ${lead.jobTitle} at ${lead.company}. We specialize in helping successful professionals like yourself create additional income streams and optimize their financial strategies. I'd love to connect and share some insights that could be valuable for someone in your position. Would you be open to a brief conversation?`,
      
      'educational': `Hi there! I'm ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago, and I wanted to share this important information about ${campaignType === 'retirement' ? 'retirement planning strategies' : 'wealth building opportunities'} that could significantly impact your financial future. Many people don't realize the opportunities available to them, and I don't want you to miss out. The concepts I'm about to share have helped thousands of families achieve financial freedom. Take a moment to watch this, and if it resonates with you, I'd be happy to discuss how it applies to your specific situation.`
    };
    
    return scripts[campaignType] || scripts['educational'];
  }
}

// Webhook handlers for campaign tracking
export function setupAIAutomationRoutes(app: express.Application) {
  // Phone call webhook from Retell AI
  app.post('/api/ai-automation/phone-webhook', async (req, res) => {
    const { call_id, call_status, call_analysis } = req.body;
    
    // Update lead in database with call results
    // This would integrate with your existing HubSpot/database system
    
    console.log(`Phone call ${call_id} completed with status: ${call_status}`);
    
    if (call_analysis?.appointment_booked) {
      // Trigger appointment booking workflow
      console.log('Appointment booked - triggering calendar integration');
    }
    
    res.status(200).json({ success: true });
  });

  // Video engagement webhook from email platform
  app.post('/api/ai-automation/video-webhook', async (req, res) => {
    const { lead_id, video_id, engagement_type } = req.body;
    
    // Track video engagement metrics
    console.log(`Lead ${lead_id} ${engagement_type} video ${video_id}`);
    
    res.status(200).json({ success: true });
  });

  // Campaign management endpoints
  app.post('/api/ai-automation/launch-phone-campaign', async (req, res) => {
    const { leads, campaign_type } = req.body;
    
    // Initialize AI phone service
    const phoneService = new AIPhoneService(
      process.env.RETELL_API_KEY!,
      process.env.ELEVENLABS_API_KEY!
    );
    
    try {
      const results = await phoneService.launchPhoneCampaign(leads, campaign_type);
      res.json({ success: true, results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/ai-automation/launch-video-campaign', async (req, res) => {
    const { leads, campaign_type } = req.body;
    
    // Initialize AI video service
    const videoService = new AIVideoService(
      process.env.HEYGEN_API_KEY!,
      process.env.TAVUS_API_KEY!
    );
    
    try {
      const results = await videoService.launchVideoCampaign(leads, campaign_type);
      res.json({ success: true, results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Setup endpoints for voice/avatar creation
  app.post('/api/ai-automation/setup-voice-clone', async (req, res) => {
    const { name, audio_samples } = req.body;
    
    const phoneService = new AIPhoneService(
      process.env.RETELL_API_KEY!,
      process.env.ELEVENLABS_API_KEY!
    );
    
    try {
      const voiceClone = await phoneService.createVoiceClone(name, audio_samples);
      res.json({ success: true, voice_id: voiceClone.voice_id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/ai-automation/setup-avatar', async (req, res) => {
    const { name, video_url } = req.body;
    
    const videoService = new AIVideoService(
      process.env.HEYGEN_API_KEY!,
      process.env.TAVUS_API_KEY!
    );
    
    try {
      const avatar = await videoService.createAvatar(name, video_url);
      res.json({ success: true, avatar_id: avatar.avatar_id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

// Integration with existing HubSpot system
export function integateWithHubSpot(hubspotApiKey: string) {
  return {
    // Update lead with AI interaction results
    updateLeadWithAIResults: async (leadId: string, interactionData: any) => {
      const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${hubspotApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            ai_phone_call_status: interactionData.phoneCallStatus,
            ai_video_engagement: interactionData.videoEngagement,
            last_ai_interaction: new Date().toISOString(),
            ai_campaign_type: interactionData.campaignType
          }
        })
      });
      return response.json();
    },

    // Create task for follow-up based on AI interaction
    createFollowUpTask: async (leadId: string, taskData: any) => {
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            hs_task_subject: taskData.subject,
            hs_task_body: taskData.body,
            hs_task_status: 'NOT_STARTED',
            hs_task_priority: taskData.priority,
            hubspot_owner_id: taskData.ownerId
          },
          associations: [{
            to: { id: leadId },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }] // Task to Contact
          }]
        })
      });
      return response.json();
    }
  };
}