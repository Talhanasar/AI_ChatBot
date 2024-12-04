import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ChatBot from "./components/ChatBot"

export default function AppLayout() {
    return (
        <div>
            <Header />
            <Outlet/>
            <Footer />
            <ChatBot/>
        </div>
    )
}