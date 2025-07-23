interface Message {
  sender: String;
  text: String;
  timestamp: Date
}

interface Option {
  state: string;
  display: string;
}
interface InternalResponseData {
  messages: string[];
  options: Option[];
}

interface ResponseData {
  messages: string[];
  options: string[];
}

interface ConversationStep {
  id: string;
  response: InternalResponseData;
}
