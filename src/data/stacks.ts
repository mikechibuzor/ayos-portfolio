import type { StackTool } from "../types/site";
import adobeXdIcon from "../assets/icons/stacks/adobe-xd.svg";
import claudeIcon from "../assets/icons/stacks/claude.svg";
import figmaIcon from "../assets/icons/stacks/figma.svg";
import framerIcon from "../assets/icons/stacks/framer.svg";
import gmailIcon from "../assets/icons/stacks/gmail.svg";
import googleDriveIcon from "../assets/icons/stacks/google-drive.svg";
import googleMeetIcon from "../assets/icons/stacks/google-meet.svg";
import illustratorIcon from "../assets/icons/stacks/illustrator.svg";
import openaiIcon from "../assets/icons/stacks/openai.svg";
import photoshopIcon from "../assets/icons/stacks/photoshop.svg";

export const stackTools: StackTool[] = [
  { name: "Figma", iconSource: figmaIcon, iconClassName: "stack-section__icon--figma" },
  { name: "Adobe XD", iconSource: adobeXdIcon },
  { name: "Photoshop", iconSource: photoshopIcon },
  { name: "Illustrator", iconSource: illustratorIcon },
  { name: "Google Meet", iconSource: googleMeetIcon },
  { name: "Gmail", iconSource: gmailIcon, iconClassName: "stack-section__icon--gmail" },
  { name: "OpenAI", iconSource: openaiIcon },
  { name: "Claude", iconSource: claudeIcon },
  { name: "Google Drive", iconSource: googleDriveIcon },
  { name: "Framer", iconSource: framerIcon },
];
