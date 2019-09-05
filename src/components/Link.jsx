import React from "react";
import { PropTypes } from "prop-types";
import History from "../utils/history";

const Link = ({ href, children, className }) => {
  const onClick = e => {
    const aNewTab = e.metaKey || e.ctrlKey;
    const anExternalLink = href.startsWith("http");

    if (!aNewTab && !anExternalLink) {
      e.preventDefault();
      History.push(href);
    }
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default Link;
