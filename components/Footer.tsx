import LinkPreview from "./LinkPrev";


export default function Footer(): JSX.Element {

  const getTodaysYear = () => {
    const today = new Date();
    return today.getFullYear();
  }
  return (
    <footer className="pb-px body">
      <hr />
      <div className="my-16 text-center text-xs font-light text-gray-600 dark:text-gray-400 sm:text-sm">
        {`${getTodaysYear()} - `} {}
        <span className="font-normal">
          <LinkPreview
            name="Lukacs Papp"
            href="https://www.linkedin.com/in/lukacsjpapp/"
            preview="/linkedin-preview.png"
            alt="Lukacs Papp's Twitter"
            style="neutral"
            showExternalIndicator={false}
          />
        </span>
      </div>
    </footer>
  )
}