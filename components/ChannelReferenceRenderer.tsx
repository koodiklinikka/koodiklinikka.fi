export const ChannelReferenceRenderer = (props: { value: string }) => {
  return (
    <>
      {props.value.split(/(<#[A-Z0-9]+\|[A-Za-z0-9]+>)/).map((str) => {
        const matches = str.match(/<#([A-Z0-9]+)\|([A-Za-z0-9]+)>/);
        if (matches) {
          return (
            <a href={`https://app.slack.com/client/T03BQ3NU9/${matches[1]}`}>
              #{matches[2]}
            </a>
          );
        }
        return str;
      })}
    </>
  );
};
