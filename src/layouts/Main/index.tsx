import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Header from "~/components/Header"
import Sidebar from "~/components/Sidebar"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"

const MainLayout: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter()

  const currentUserQuery = api.user.getCurrent.useQuery(undefined, {
    retry: false,
  })

  useEffect(() => {
    if (!currentUserQuery.isLoading && currentUserQuery.error)
      void router.push(PagePaths.SignIn)
    else useAuthStore.setState({ user: currentUserQuery.data })
  }, [
    currentUserQuery.data,
    currentUserQuery.error,
    currentUserQuery.isLoading,
    router,
  ])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="container pb-safe-area">
        <Header />
        {props.children}
      </div>
    </>
  )
}

export default MainLayout
