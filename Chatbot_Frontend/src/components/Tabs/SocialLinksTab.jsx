import React from "react";

export const SocialLinksTab = () => (
  <div className="p-4">
    <h3 className="text-xl font-bold mb-2">Social Links</h3>
    <ul>
      <li>
        <a
          href="#"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </li>
      <li>
        <a
          href="#"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
      {/* Add more social links here */}
    </ul>
  </div>
);
