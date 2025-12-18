import Chat from "../components/Chat";

export default function SoilChat() {
    return (
        <Chat
            title="AI Soil Assistant"
            endpoint="http://localhost:10000/api/soil/chat"
            placeholder="Ask a question about soils, crops, or farming..."
            emptyMessage="Start a conversation! Ask me anything about soils or agriculture."
        />
    );
}