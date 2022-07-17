import { React, useCallback, useRef, useState } from 'react'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Tfoot, Td, Badge, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { putRouteProductName } from '../config'
import ErrorMessage from './ErrorMessage'

export default function TableProducts({ data, status, updateTableState, onUpdateTable }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [newProductName, setNewProductName] = useState(null)
  const [productId, setProductId] = useState(null)
  const [fetchStatus, setFetchStatus] = useState({
    error: null,
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
          error: null,
          loaded: true
        })
        onClose()
      })
      .catch(errorRes => {
        setFetchStatus({
          error: errorRes,
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
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={['xs', 'md', 'lg']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar nombre de producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {fetchStatus.error ? <Alert mb='1rem' status='error' display='flex' flexDir='row' alignItems='center'>
              <AlertIcon />
              <Box display='flex' flexDir='column'>
                <AlertTitle>¡Error!</AlertTitle>
                <AlertDescription>Hubo un problema actualizando los datos.</AlertDescription>
              </Box>
            </Alert> : null}
            <FormControl>
              <FormLabel>Inserta el nuevo nombre</FormLabel>
              <Input ref={initialRef} value={newProductName} onChange={(event) => setNewProductName(event.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSaveButton}>Guardar</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {
        data?.length > 0 || !status?.error
          ? <TableContainer w='100%' borderWidth='1px' borderRadius='md' bg='text_small' alignSelf='center'>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>Listado de productos registrados</TableCaption>
              <Thead>
                <Tr>
                  <Th isNumeric>Id</Th>
                  <Th>Nombre</Th>
                  <Th>Tipo</Th>
                  <Th isNumeric>Monto máximo</Th>
                  <Th>Moneda</Th>
                  <Th>Segmentos</Th>
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
                          row.depositos[0] ? row.depositos[0].tipo_moneda : null
                        }
                      </Td>
                      <Td>
                        {
                          row.segmentos ? row.segmentos.map((valor, i) => (
                            <Badge key={i} mx='0.2rem'>{valor.nombre_segmento}</Badge>
                          )) : null
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
                  <Th>Moneda</Th>
                  <Th>Segmentos</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          : <ErrorMessage message={'Los datos no fueron obtenidos correctamente.'} />
      }
    </>
  )
}