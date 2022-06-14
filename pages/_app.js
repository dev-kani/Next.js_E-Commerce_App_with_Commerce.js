import { useEffect } from 'react'
import '../styles/globals.css'
import { StoreProvider } from '../components/Store'
import Router from 'next/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


Router.events.on('routeChangeStart', () => Nprogress.start())
Router.events.on('routeChangeComplete', () => Nprogress.done())
Router.events.on('routeChangeError', () => Nprogress.done())

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // remove server side injected css
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async () => {
  return {
    pageProps: {
      commercePublicKey: process.env.COMMERCEJS_PUBLIC_KEY
    }
  }
}