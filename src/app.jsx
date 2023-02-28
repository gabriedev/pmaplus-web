import { lazy, Suspense } from 'preact/compat'
import { Route } from 'wouter-preact'

// Auto generates routes from files under ./routes
const ROUTES = import.meta.glob('@/routes/**/[a-z[]*.jsx')

const routes = Object.keys(ROUTES).map((page) => {
  const path = page
    .replace(/\/src\/routes|index|\.jsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')

  return { path, page: lazy(ROUTES[page]) }
})

export default function App() {
  return (
    <Suspense fallback={null}>
      {routes.map(({ path, page }) => (
        <Route key={path} path={path} component={page} />
      ))}
    </Suspense>
  )
}
