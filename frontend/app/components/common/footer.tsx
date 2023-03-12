import Image from 'next/image'

const Footer = () => (
  <footer className="mt-8 text-center">
    <a className="bold underline" href="mailto:pappdomonkos96@gmail.com">
      pappdomonkos96@gmail.com
    </a>
    <Image
      src="/vercel.svg"
      alt="Vercel Logo"
      width={72}
      height={16}
      className="mx-auto mt-4 mb-4"
    />
  </footer>
)
export default Footer
