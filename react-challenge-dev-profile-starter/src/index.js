import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { profile } from "./data";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />

        <SkillList />
      </div>
    </div>
  );
}

const Avatar = () => {
  return (
    <img src={profile.profile_picture} alt="profile" className="avatar"></img>
  );
};

const Intro = () => {
  return (
    <>
      <h1>{profile.name}</h1>
      <p>{profile.description}</p>
    </>
  );
};

const SkillList = () => {
  return (
    <div className="skill-list">
      {profile.skills && profile.skills.map((skill) => (
        <span
          className="skill"
          style={{ backgroundColor: skill.color }}
          key={skill.skill}
        >
          {skill.skill} {skill.emoji}
        </span>
      ))}
    </div>
  );
};
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
