export interface Vertical {
  id: string;
  name: string;
  short: string;
  tag: string;
  line: string;
  does: string[];
  withV: string;
  leadRole: string;
}

export interface PipelineStep {
  tool: string;
  verb: string;
  short: string;
  text: string;
}

export interface TeamMember {
  name: string | null;
  role: string;
  initials?: string;
  photo: string | null;
  desc?: string;
}

export interface TeamData {
  president: TeamMember;
  vp: TeamMember;
  leads: Record<string, { name: string | null; photo: string | null }>;
}

export const VERTICALS: Vertical[] = [
  {
    id: 'tech',
    name: 'Technical',
    short: 'TECHNICAL',
    tag: 'Engine room',
    line: 'Builds the stack.',
    does: [
      'Designs and ships the club’s automations, web tools and internal systems.',
      'Teaches the AI Automation Bootcamp and runs member workshops.',
      'Reviews code and mentors members from a first script to a shipped project.'
    ],
    withV: 'Every vertical',
    leadRole: 'Technical Lead'
  },
  {
    id: 'free',
    name: 'Freelancing Coordinator',
    short: 'FREELANCING',
    tag: 'Paid work',
    line: 'Turns skills into paid work.',
    does: [
      'Sources real client briefs and matches them to members.',
      'Sets scoping, pricing and delivery standards for member projects.',
      'Builds each member’s portfolio of delivered work.'
    ],
    withV: 'Technical, Marketing & Outreach',
    leadRole: 'Freelancing Coordinator'
  },
  {
    id: 'start',
    name: 'Startup & Investment',
    short: 'STARTUP',
    tag: 'Idea to pitch',
    line: 'Takes an idea to a pitch.',
    does: [
      'Pressure-tests member ideas and shapes them into pitches.',
      'Prepares teams to face incubators, mentors and investors.',
      'Keeps the link to ecosystem bodies such as T-Hub Hyderabad.'
    ],
    withV: 'Technical, Marketing & Outreach',
    leadRole: 'Startup & Investment Lead'
  },
  {
    id: 'mkt',
    name: 'Marketing & Outreach',
    short: 'MARKETING',
    tag: 'Story and reach',
    line: 'Carries the story outward.',
    does: [
      'Runs the club’s brand, social channels and campaigns.',
      'Opens doors with campus bodies, companies and communities.',
      'Leads onboarding when a new campus chapter opens.'
    ],
    withV: 'Event Coordination, Production',
    leadRole: 'Marketing & Outreach Lead'
  },
  {
    id: 'prod',
    name: 'Production',
    short: 'PRODUCTION',
    tag: 'Capture and broadcast',
    line: 'Captures it and puts it on air.',
    does: [
      'Shoots and edits video and photography for the club and GWD Sports.',
      'Operates live streams in OBS: scenes, overlays and feeds.',
      'Crews on-ground productions, including matchdays.'
    ],
    withV: 'Event Coordination, Marketing & Outreach',
    leadRole: 'Production Lead'
  },
  {
    id: 'event',
    name: 'Event Coordination',
    short: 'EVENTS',
    tag: 'On the day',
    line: 'Makes it happen on the day.',
    does: [
      'Plans and runs hackathons, bootcamps and campus sessions.',
      'Owns schedules, logistics, volunteers and venue coordination.',
      'Builds the workflow sheets interns follow on matchdays.'
    ],
    withV: 'Production, Technical',
    leadRole: 'Event Coordinator'
  }
];

export const STEPS: PipelineStep[] = [
  {
    tool: 'Apify',
    verb: 'Collect',
    short: 'APIFY',
    text: 'Apify actors scrape and structure data from public web sources, so every workflow starts from real inputs instead of a hand-typed sheet.'
  },
  {
    tool: 'n8n',
    verb: 'Orchestrate',
    short: 'N8N',
    text: 'n8n is the workflow canvas. Triggers, branches, retries and error paths tie every other tool into one running pipeline.'
  },
  {
    tool: 'OpenAI',
    verb: 'Reason',
    short: 'OPENAI',
    text: 'OpenAI models classify, summarise, extract and draft. Members learn prompt design, structured outputs and where a model should not be trusted.'
  },
  {
    tool: 'Google APIs',
    verb: 'Deliver',
    short: 'GOOGLE',
    text: 'Google APIs write rows to Sheets, send mail through Gmail, book Calendar slots and file results in Drive.'
  }
];

export const TEAM: TeamData = {
  president: {
    name: 'Mohammed Abdul Mudabbir',
    role: 'President',
    initials: 'MM',
    photo: null,
    desc: 'Heads the club, sets its direction and owns the relationship with the parent firm and ecosystem bodies.'
  },
  vp: {
    name: 'Mohd Abdul Rahman Pasha',
    role: 'Vice President',
    initials: 'MP',
    photo: null,
    desc: 'Runs day-to-day operations across the six verticals and supports the President.'
  },
  leads: {
    tech: { name: null, photo: null },
    free: { name: null, photo: null },
    start: { name: null, photo: null },
    mkt: { name: null, photo: null },
    prod: { name: null, photo: null },
    event: { name: null, photo: null }
  }
};

export const SECTIONS: [string, string][] = [
  ['top', 'Arrival'],
  ['identity', 'Identity'],
  ['verticals', 'Verticals'],
  ['bootcamp', 'Bootcamp'],
  ['matchday', 'Matchday'],
  ['roadmap', 'Roadmap'],
  ['team', 'Team'],
  ['join', 'Join']
];
