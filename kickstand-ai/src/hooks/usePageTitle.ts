import { useEffect } from 'react'

function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · Kickstand AI`
    return () => {
      document.title = previous
    }
  }, [title])
}

export default usePageTitle
