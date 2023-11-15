import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react'
import Context from 'WNTR/utils/context'

export default function Document() {

  const currentContext = useContext(Context)

  return (
    <Html lang="en">
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${currentContext?.website?.gA4}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${currentContext?.website?.gA4}', { page_path: window.location.pathname });` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}