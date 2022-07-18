import { React, useCallback, useRef, useState } from 'react'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Tfoot, Td, Badge, Button, useDisclosure } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { putRouteProductName } from '../config'
import ErrorMessage from './ErrorMessage'
import EditWindow from './EditWindow'

export default function TableProducts({ data, status, updateTableState, onUpdateTable }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [newProductName, setNewProductName] = useState(null)
  const [productId, setProductId] = useState(null)
  const [fetchStatus, setFetchStatus] = useState({
    failed: null,
    errorMessage: null,
    loaded: false
  })

  const fetchPut = useCallback(() => {
    const data = { value: newProductName }
    const query = putRouteProductName(productId)
    fetch(query, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(dataRes => {
        setFetchStatus({
          failed: false,
          errorMessage: null,
          loaded: true
        })
        onClose()
      })
      .catch(errorRes => {
        setFetchStatus({
          failed: false,
          errorMessage: errorRes,
          loaded: true
        })
      })
  }, [newProductName, productId, onClose])

  const handleEditButton = (row) => {
    setNewProductName(row.nombre_producto)
    setProductId(row.id)
    onOpen()
  }

  const handleSaveButton = () => {
    fetchPut()
    onUpdateTable(!updateTableState)
  }

  return (
    <>
      <EditWindow initialRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        handleSaveButton={handleSaveButton}
        fetchStatus={fetchStatus} />
      {
        data?.length > 0 || status?.failed ?
            <TableContainer w='100%' borderWidth='1px' borderRadius='md' bg='text_small' alignSelf='center'>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Listado de productos registrados</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>Id</Th>
                    <Th>Nombre</Th>
                    <Th>Tipo</Th>
                    <Th isNumeric>Monto máximo</Th>
                    <Th>Segmentos</Th>
                    <Th>Moneda</Th>
                    <Th>Adquisición</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    data ? data.map((row, i) => (
                      <Tr key={i}>
                        <Td isNumeric fontWeight='semibold'>{row.id}</Td>
                        <Td>{row.nombre_producto}</Td>
                        <Td>{row['tipo_producto'].nombre_tipo}</Td>
                        <Td isNumeric>{row.monto_maximo}</Td>
                        <Td>
                          {
                            row.segmentos ? row.segmentos.map((valor, i) => (
                              <Badge key={i} mx='0.2rem'>{valor.nombre_segmento}</Badge>
                            )) : null
                          }
                        </Td>
                        <Td>
                          {
                            row.depositos[0] ? row.depositos[0].tipo_moneda : null
                          }
                        </Td>
                        <Td>
                          {
                            row.prestamos[0] ? row.prestamos[0].adquisicion.nombre_adquisicion : null
                          }
                        </Td>
                        <Td>
                          <Button display='flex' gap='0.4rem' onClick={() => { handleEditButton(row) }}><EditIcon />Editar</Button>
                        </Td>
                      </Tr>
                    )) : null
                  }
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th isNumeric>Id</Th>
                    <Th>Nombre</Th>
                    <Th>Tipo</Th>
                    <Th isNumeric>Monto máximo</Th>
                    <Th>Segmentos</Th>
                    <Th>Moneda</Th>
                    <Th>Adquisición</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          : <ErrorMessage message={status.errorMessage} />
      }
    </>
  )
}