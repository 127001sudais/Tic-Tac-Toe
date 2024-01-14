import { useState } from "react";
import "./App.css";
import TicTacToe from "./components/Gameboard/GameboardUI";
import MLobby from "./components/Lobby/Lobby";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { component: <TicTacToe />, label: "AI(miniMAX)", icon: "🤖" },
  { component: <MLobby />, label: "MultiPlayer", icon: "🤼" },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="window">
      <nav>
        <ul>
          {tabs.map((item) => (
            <li
              key={item.label}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab ? selectedTab.component : null}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
