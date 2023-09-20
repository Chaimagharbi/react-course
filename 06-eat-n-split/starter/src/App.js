import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isOpenFriend, setIsOpenFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleFriends(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setIsOpenFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend?.id ? null : friend));
    setIsOpenFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends?.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selected={selectedFriend}
        ></Friends>
        {isOpenFriend && <AddFriend onAddFriend={handleFriends}></AddFriend>}
        <Button onClick={() => setIsOpenFriend((io) => !io)}>
          {isOpenFriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <BillSplit
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        ></BillSplit>
      )}
    </div>
  );
}

function Friends({ friends, onSelectFriend, selected }) {
  return (
    <ul>
      {friends &&
        friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelectFriend={onSelectFriend}
            selected={selected}
          ></Friend>
        ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selected }) {
  const isSelected = friend.id === selected?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setImage("https://i.pravatar.cc/48");
    setName("");
  };
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>🧑‍🤝‍👩 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function BillSplit({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [PersonPay, setPersonPay] = useState("You");
  const othersExpense = bill ? bill - myExpense : "";

  function handlePayment(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    if (PersonPay === "You") {
      onSplitBill(othersExpense);
    } else if (PersonPay === "other") {
      onSplitBill(-myExpense);
    }
  }
  return (
    <form className="form-split-bill" onSubmit={handlePayment}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍 Your expense</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={othersExpense} />
      <label>🤑 Who is paying the bill</label>
      <select value={PersonPay} onChange={(e) => setPersonPay(e.target.value)}>
        <option value="You">You</option>
        <option value="other">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
