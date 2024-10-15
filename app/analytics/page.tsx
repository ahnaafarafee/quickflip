import Link from "next/link";
import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <h1>This feature isn't available yet. Please check back later!</h1>
      <Link href="/study" className="btn-link">
        Study your cards
      </Link>
      <Link href="/decks" className="btn-link">
        See your decks
      </Link>
      <Link href="/create" className="btn-link">
        Create new decks
      </Link>
    </div>
  );
};

export default AnalyticsPage;
