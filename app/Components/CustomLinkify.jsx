import React from 'react';

export const CustomLinkify = ({ message }) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.split(linkRegex);

  return parts.map((part, index) =>
    linkRegex.test(part) ? (
      <a
        key={index}
        href={part}
        className=" font-bold  hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

