import { Link } from 'react-router-dom';

export const FormLink = ({
  text,
  urlText,
  url,
}: {
  text: string;
  urlText: string;
  url: string;
}) => {
  const spilitedText = text.split(urlText)[0];
  const modifiedText = spilitedText[1].slice(urlText.length);
  return (
    <p className="text-semibold text-gray-800 ml-40 mt-2">
      {spilitedText}
      <Link to={url} className="underline  text-orange-800">
        {urlText}
      </Link>
      {modifiedText}
    </p>
  );
};
