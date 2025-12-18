import Chat from "../components/Chat";

export default function BookChat() {
    return (
        <Chat
            title="AI Book Assistant"
            endpoint="http://localhost:10000/api/book/chat"
            placeholder="Ask a question about books, authors, or genres..."
            emptyMessage="Start a conversation! Ask me anything about books."
        />
    );
}