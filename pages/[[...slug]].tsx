import Head from 'next/head'
import Context from 'WNTR/utils/context'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useContext, useEffect } from 'react'
import { Loading, Main, Header } from 'WNTR/components'
import { IWebsite, IPage } from 'WNTR/interfaces'

export default function Index({ website, page }: { website: IWebsite, page: IPage }) {

    const context = useContext(Context)

    useEffect(() => {
        context.setWebsite(website)
        context.setPage(page)
    }, [website, page])

    return(
        <>
            <Head>
                <title>{(page.metaData.title ?? page.name) + ' | ' + website.name}</title>
                <meta name="description" content={page.metaData.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={(page.metaData.title ?? page.name) + ' | ' + website.name} />
                <meta property="og:description" content={page.metaData.description} />
                <meta property="og:url" content={page.url} />
                <meta property="og:image" content={`${page.metaData.image}?mode=crop&width=500&height=500`} />
                <meta name="site_name" property="og:site_name" content={website.name} />
                <meta name="twitter:site" content="RaeWilliamsRacing" />
                <meta name="twitter:site:id" content="RaeWilliamsRacing" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={page.metaData.title ?? page.name + ' | ' + website.name} />
                <meta name="twitter:description" content={page.metaData.description} />
                <meta name="twitter:image" content={`${page.metaData.image}?mode=crop&width=500&height=500`} />
                <meta name="environment" content={process.env.NEXT_PUBLIC_VERCEL_ENV} />
                <link rel="canonical" href={page.url}></link>
            </Head>
            <div className="sizeInd" />
            { context.loading ? <Loading /> : null }
            <Header />
            <Main />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let path = "/";
    [params?.slug].map((slug) => path += slug?.toString().replace(",", "/") + "/")

    const api = axios.create({
        baseURL: process.env.API_HOST,
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    const website = await api.get('/api/website')
    const id = params?.slug && website.data.routes[path] !== undefined ? website.data.routes[path] : website.data.id;
    const page = await api.get('/api/page/' + id)

    return { props: { website: website.data, page: page.data } }
}