import React from 'react';

const PostLink = ({ id, values: { key } }) => {
  let hostname = window.location.hostname;

  // Set non-standard ports
  if (
    window.location.port &&
    (window.location.port !== '80' || window.location.port !== '443')
  ) {
    hostname += ':' + window.location.port;
  }

  const postURL = `${hostname}/view/${id}/#${key}`;

  return (
    <div>
      {id && key && (
        <div>
          <p className="newPost__url">This post is available at:</p>
          <p className="newPost__url">
            <a href={`//${postURL}`}>{postURL}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PostLink;
