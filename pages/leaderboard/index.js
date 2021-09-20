import React, { useState, useEffect } from "react";

export default function Leaderboard({ userScores }) {


  const title = function () {
    return <h1> All Time Leaderboard </h1>;
  };

  // List all the user names and scores sequentially, assumes that they are already sorted
  const body = function () {
    var listItems = userScores.map((user, i) => (
      <li key={i}>
        {user.name} {user.score}
      </li>
    ));

    return <ol>{listItems}</ol>;
  };

  // Links to share?
  const links = function () {
    return (
      <span>
        <button> Facebook </button>
        <button> Instagram </button>
      </span>
    );
  };

  return (
    <div>
      {title()}
      {body()}
      {links()}
    </div>
  );
}

export async function getServerSideProps() {
        // 
  const res = await fetch("http://localhost:3000/api/leaderboard");
  const results = await res.json();

  return {
    props: {
      userScores: results.userScores,
    },
  };
}
