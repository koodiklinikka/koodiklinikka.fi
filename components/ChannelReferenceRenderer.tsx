/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

function renderStringWithChannelRefs(value: string) {
  return (
    <>
      {value.split(/(<#[A-Z0-9]+\|[A-Za-z0-9]+>)/).map((str, i) => {
        const matches = str.match(/<#([A-Z0-9]+)\|([A-Za-z0-9]+)>/);
        if (matches) {
          return (
            <a href={`https://app.slack.com/client/T03BQ3NU9/${matches[1]}`} key={i}>
              #{matches[2]}
            </a>
          );
        }
        return <React.Fragment key={i}>{str}</React.Fragment>;
      })}
    </>
  );
}

export const ChannelReferenceRenderer = ({ children }: React.PropsWithChildren<{}>) => {
  // TODO: this should probably walk the tree
  if (typeof children[0] === "string") return renderStringWithChannelRefs(children[0]);
  return <>{children}</>;
};
