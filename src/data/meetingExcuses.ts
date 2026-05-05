/**
 * Meeting Excuse Generator — dataset (10 categories × 10 excuses).
 * Context rules: wfh | office | both (filtering in lib helpers).
 */

export type ExcuseContext = "wfh" | "office" | "both";

export type MeetingExcuseEntry = {
  text: string;
  context: ExcuseContext;
};

export type MeetingExcuseCategory = {
  label: string;
  excuses: MeetingExcuseEntry[];
};

export const meetingExcuses = {
  corporateNonsense: {
    label: "Corporate Nonsense",
    excuses: [
      {
        text: "I’m currently realigning priorities around a moving deliverable and may be more useful async.",
        context: "both",
      },
      {
        text: "I need to circle back after a quick internal calibration on another workstream.",
        context: "both",
      },
      {
        text: "I’m blocked by a dependency that has not fully matured yet.",
        context: "both",
      },
      {
        text: "I’m in a deep dive on a separate high-impact alignment stream.",
        context: "both",
      },
      {
        text: "I’m resolving a cross-functional ambiguity that appeared with no warning.",
        context: "both",
      },
      {
        text: "I have a conflict with a stakeholder sync about another stakeholder sync.",
        context: "both",
      },
      {
        text: "I need to review the pre-read before I can meaningfully contribute without pretending.",
        context: "both",
      },
      {
        text: "I’m waiting on inputs from a parallel workstream before joining the discussion.",
        context: "both",
      },
      {
        text: "I’m currently in a bandwidth optimization window and should protect the output quality.",
        context: "both",
      },
      {
        text: "I’ll be more useful if I send my updates asynchronously instead of becoming another square on the call.",
        context: "both",
      },
    ],
  },

  technicalDifficulties: {
    label: "Technical Difficulties",
    excuses: [
      { text: "My Wi-Fi is connected, but emotionally unavailable.", context: "wfh" },
      { text: "My microphone has entered a leadership silence period.", context: "wfh" },
      { text: "Teams has decided I am not meant to attend this meeting today.", context: "both" },
      { text: "My laptop fan is louder than my contribution would be.", context: "both" },
      { text: "My camera works, but only in witness protection mode.", context: "wfh" },
      {
        text: "The office meeting room screen is having a personal growth moment.",
        context: "office",
      },
      { text: "I’m troubleshooting a suspiciously meeting-specific issue.", context: "both" },
      { text: "My headset is currently producing executive-level static.", context: "both" },
      { text: "The conference room audio has chosen chaos today.", context: "office" },
      { text: "My browser crashed immediately after seeing the agenda.", context: "both" },
    ],
  },

  calendarConflict: {
    label: "Calendar Conflict",
    excuses: [
      { text: "I have a calendar conflict that appeared with suspicious timing.", context: "both" },
      {
        text: "I’m double-booked with something that has slightly more urgency and fewer attendees.",
        context: "both",
      },
      {
        text: "I’m tied up in another meeting that also probably could have been an email.",
        context: "both",
      },
      { text: "My calendar is currently over-optimized and under-supervised.", context: "both" },
      {
        text: "I have a prior commitment during this slot and will catch up from the notes.",
        context: "both",
      },
      {
        text: "This overlaps with a focused work block I cannot move without upsetting the productivity spirits.",
        context: "both",
      },
      {
        text: "I need to protect this time for a deadline and will follow up after.",
        context: "both",
      },
      {
        text: "I’m unavailable during this window but can review the recap afterward.",
        context: "both",
      },
      {
        text: "I have a scheduling conflict and will send my update separately.",
        context: "both",
      },
      { text: "My calendar has created a situation, and I am choosing peace.", context: "both" },
    ],
  },

  focusWork: {
    label: "Focus Work",
    excuses: [
      {
        text: "I’m heads down on a deliverable and trying not to break my focus streak.",
        context: "both",
      },
      {
        text: "I’m in a deep work block and will be more useful if I stay focused right now.",
        context: "both",
      },
      {
        text: "I’m working through a priority item that needs uninterrupted attention.",
        context: "both",
      },
      {
        text: "I’m close to finishing something important and don’t want to lose momentum.",
        context: "both",
      },
      {
        text: "I’m using this slot to close out a time-sensitive task before it grows legs.",
        context: "both",
      },
      {
        text: "I’m in the office but hiding inside a spreadsheet until further notice.",
        context: "office",
      },
      {
        text: "I’ve finally entered focus mode at home and I’m scared to disturb it.",
        context: "wfh",
      },
      {
        text: "I need to finish this before my brain starts opening new tabs.",
        context: "both",
      },
      {
        text: "I’m protecting this block for actual work, which feels rare and historic.",
        context: "both",
      },
      {
        text: "I’m currently in a productivity window and may never find it again.",
        context: "both",
      },
    ],
  },

  managerSafe: {
    label: "Manager-Safe",
    excuses: [
      {
        text: "I have a conflicting priority and will review the notes afterward.",
        context: "both",
      },
      {
        text: "I’m focused on a time-sensitive deliverable and may need to skip this one.",
        context: "both",
      },
      {
        text: "I don’t have major updates, so I’ll follow along asynchronously.",
        context: "both",
      },
      {
        text: "I’m heads down on a deadline but happy to provide input offline.",
        context: "both",
      },
      {
        text: "I may not be able to join live, but I can review the summary afterward.",
        context: "both",
      },
      {
        text: "I’m unavailable during this slot but can send my update in writing.",
        context: "both",
      },
      {
        text: "I need to prioritize a deliverable and will follow up after.",
        context: "both",
      },
      {
        text: "I’ll be more effective contributing asynchronously for this discussion.",
        context: "both",
      },
      {
        text: "I have another priority that needs attention, so I’ll catch up from the recap.",
        context: "both",
      },
      {
        text: "I’m currently working through something urgent and may need to miss this meeting.",
        context: "both",
      },
    ],
  },

  overdramatic: {
    label: "Overdramatic",
    excuses: [
      {
        text: "I cannot attend. The weight of recurring meetings has finally found me.",
        context: "both",
      },
      {
        text: "I am recovering from a previous meeting that should have been an email.",
        context: "both",
      },
      { text: "My soul has requested a 30-minute buffer.", context: "both" },
      {
        text: "I stared at the agenda and entered a brief productivity fog.",
        context: "both",
      },
      { text: "I need a moment to rebuild trust with my calendar.", context: "both" },
      {
        text: "I am unavailable due to excessive exposure to action items.",
        context: "both",
      },
      {
        text: "I must step away before I become a breakout room.",
        context: "both",
      },
      {
        text: "I have reached my maximum daily synergy allowance.",
        context: "both",
      },
      {
        text: "My brain has left the call in advance as a protective measure.",
        context: "both",
      },
      {
        text: "I am emotionally buffering and may rejoin society shortly.",
        context: "both",
      },
    ],
  },

  emotionallyUnavailable: {
    label: "Emotionally Unavailable",
    excuses: [
      {
        text: "I’m not in the right headspace to pretend this needs 45 minutes.",
        context: "both",
      },
      {
        text: "I need to preserve my remaining social battery for business-critical smiling.",
        context: "office",
      },
      {
        text: "I’m currently protecting my peace from calendar-based threats.",
        context: "both",
      },
      {
        text: "I am taking a short break from verbal deliverables.",
        context: "both",
      },
      {
        text: "I have reached my conversation quota for the day.",
        context: "both",
      },
      { text: "I’m unavailable due to strategic silence.", context: "both" },
      { text: "I need to recover from excessive alignment.", context: "both" },
      {
        text: "I am currently in a low-synergy emotional state.",
        context: "both",
      },
      {
        text: "I can contribute better asynchronously and from a safe distance.",
        context: "wfh",
      },
      {
        text: "I need a moment to become professionally approachable again.",
        context: "both",
      },
    ],
  },

  operationalChaos: {
    label: "Operational Chaos",
    excuses: [
      {
        text: "I’m dealing with a small operational fire that is mostly smoke and calendar confusion.",
        context: "both",
      },
      {
        text: "I need to sort out a workflow issue before it becomes everyone’s problem.",
        context: "both",
      },
      {
        text: "Something in the process has developed a personality, and I need to investigate.",
        context: "both",
      },
      {
        text: "I’m currently untangling a handoff that arrived wearing a disguise.",
        context: "both",
      },
      {
        text: "I’m in the office trying to locate a room, a cable, and my will to participate.",
        context: "office",
      },
      {
        text: "I’m at home trying to resolve a printer issue even though I do not own a printer.",
        context: "wfh",
      },
      {
        text: "I’m tracking down a missing update that may have joined another department.",
        context: "both",
      },
      {
        text: "I need to clean up a process gap before it starts inviting people to meetings.",
        context: "both",
      },
      {
        text: "I’m handling an unexpected admin spiral and will catch up afterward.",
        context: "both",
      },
      {
        text: "I’m dealing with a tiny systems mystery that refuses to be documented.",
        context: "both",
      },
    ],
  },

  politeProfessional: {
    label: "Polite Professional",
    excuses: [
      {
        text: "I won’t be able to join live, but I’ll review the notes and follow up if needed.",
        context: "both",
      },
      {
        text: "I have a conflict at that time, so please feel free to proceed without me.",
        context: "both",
      },
      {
        text: "I’m tied up with another priority, but I can provide my input separately.",
        context: "both",
      },
      {
        text: "I may not be needed for the full discussion, so I’ll send any updates in writing.",
        context: "both",
      },
      {
        text: "I’m unavailable during this slot, but I’m happy to review the outcomes afterward.",
        context: "both",
      },
      {
        text: "I have another commitment and will catch up from the meeting summary.",
        context: "both",
      },
      {
        text: "I’m focusing on a deadline right now, but please tag me on anything that needs my input.",
        context: "both",
      },
      {
        text: "I don’t have any blockers to raise, so I’ll stay async unless something needs discussion.",
        context: "both",
      },
      {
        text: "I’m unable to attend this one, but I’ll review any action items assigned to me.",
        context: "both",
      },
      {
        text: "I’ll skip this meeting to focus on delivery, but I’ll stay available for follow-up questions.",
        context: "both",
      },
    ],
  },

  maximumNonsense: {
    label: "Maximum Nonsense",
    excuses: [
      {
        text: "My calendar and I are going through a difficult reconciliation process.",
        context: "both",
      },
      {
        text: "I accidentally clicked Maybe on my own motivation and now everything is pending.",
        context: "both",
      },
      {
        text: "My home office chair has unionized and is refusing further meetings.",
        context: "wfh",
      },
      {
        text: "The office coffee machine gave me a look, and now I need to process it.",
        context: "office",
      },
      {
        text: "I’m currently trapped in a priority alignment spiral and may return slightly more corporate.",
        context: "both",
      },
      {
        text: "A sticky note has challenged my authority, and I must respond.",
        context: "both",
      },
      {
        text: "My laptop opened Outlook by itself, so I’m assuming it needs privacy.",
        context: "both",
      },
      {
        text: "I need to attend a silent meeting with myself about attending fewer meetings.",
        context: "both",
      },
      {
        text: "The agenda loaded, but my enthusiasm is still buffering at 2 percent.",
        context: "both",
      },
      {
        text: "I have been selected by the spreadsheet and cannot leave until the cells release me.",
        context: "both",
      },
    ],
  },
} as const satisfies Record<string, MeetingExcuseCategory>;

export type MeetingExcuseCategoryKey = keyof typeof meetingExcuses;

export const MEETING_EXCUSE_CATEGORY_KEYS = Object.keys(
  meetingExcuses,
) as MeetingExcuseCategoryKey[];
