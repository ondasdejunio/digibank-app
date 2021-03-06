import { getRouteAllProducts } from "./config";
import { useEffect, useState } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { myTheme } from "./styles/theme.ts"
import Navbar from "./components/Navbar"
import Information from "./components/Information"
import Products from "./components/Products";

export default function App() {
  const [status, setStatus] = useState({failed: null, errorMessage: null, loaded: false})
  const [products, setProducts] = useState(null)
  const [completeProducts, setCompleteProducts] = useState(null)
  const [apiQuery, setApiQuery] = useState(getRouteAllProducts)
  const [updateTable, setUpdateTable] = useState(false)

  useEffect(() => {
    setStatus({
      failed: null,
      errorMessage: null,
      loaded: false
    })

    fetch(apiQuery)
      .then(resp => resp.json())
      .then(data => {
        if(Array.isArray(data)) {
          setCompleteProducts(data)
          setProducts(data)
          setStatus({
            failed: false,
            errorMessage: null,
            loaded: true
          })
        } else {
          setStatus({
            failed: true,
            errorMessage: data.message,
            loaded: true
          })
        }
      })
      .catch(errorRes => {
        setStatus({
          failed: true,
          errorMessage: errorRes,
          loaded: true
        })
      })
    }, [apiQuery, updateTable])

  return (
    <ChakraProvider theme={myTheme} >
      <Navbar />
      <Container
        p={['1rem', '2rem', '3.5rem']}
        spacing='3rem'
        minH='fit-content'
        minW='100%'
        mt={['1rem', '0', '0']}>
        <Information />
        <Products
          status={status}
          products={products}
          completeProducts={completeProducts}
          onChangeApiUrl={setApiQuery}
          onChangeProducts={setProducts}
          onChangeStatus={setStatus}
          updateTableState={updateTable}
          onUpdateTable={setUpdateTable} />
      </Container>
    </ChakraProvider>
  )
}
