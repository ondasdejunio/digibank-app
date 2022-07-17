import { React, useState, useEffect } from 'react'
import { Container, Box, Text, Menu, MenuButton, Stack, Select, RadioGroup, Radio, MenuList, Button, Alert, AlertIcon, AlertTitle, AlertDescription, Spinner, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import TableComponent from './TableProducts';
import { getAllProducts } from '../services/products';

export default function ProductsContainer() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    //Consultas
    const [querySelect, setQuerySelect] = useState(null)
    const [filterSelect, setFilterSelect] = useState(null)

    /*
    const fetchData = async (url) => {
        await fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        
    }
    */

    const handleChangeQuery = (event) => {
        setQuerySelect(event)
        if(event==='all'){
            fetchData("http://192.168.101.7:8000/productos/")
        }
    }

    const resetFunction = () => {
        fetchData("http://192.168.101.7:8000/productos/")
        setQuerySelect(null)
    }

    const handleChangeValue = (event) => {
        if(querySelect==='productType'){
            if(event.target.value!=='optionAll' && event.target.value!==''){
                if(event.target.value==='optionAuto'){
                    fetchData("http://192.168.101.7:8000/productos/1/filtrarTipo")
                } else if(event.target.value==='optionHouse'){
                    fetchData("http://192.168.101.7:8000/productos/2/filtrarTipo")
                } else if(event.target.value==='optionAccount') {
                    fetchData("http://192.168.101.7:8000/productos/3/filtrarTipo")
                }
            } else {
                fetchData(`http://192.168.101.7:8000/productos/`)
            }
            
        } else if(querySelect==='segment'){
            if(event.target.value!=='optionAll' && event.target.value!==''){
                if(event.target.value==='optionYoung'){
                    fetchData(`http://192.168.101.7:8000/productos/1/filtrarSegmento`)
                } else if(event.target.value==='optionStan'){
                    fetchData(`http://192.168.101.7:8000/productos/2/filtrarSegmento`)
                } else if(event.target.value==='optionPrem') {
                    fetchData(`http://192.168.101.7:8000/productos/3/filtrarSegmento`)
                }
            } else {
                fetchData(`http://192.168.101.7:8000/productos/`)
            }
        }
    }

    const handleChangeRadio = (event) => {
        console.log(event)
        setFilterSelect(event)
        //Filtrar productos automotores

    }

    const selectOptions = () => {
        if(querySelect!=='all'){
            if(querySelect==='productType'){
                return(
                <Select w='fit-content' placeholder='Selecciona el valor' onChange={handleChangeValue}>
                    <option value='optionAuto'>Préstamo Automotor</option>
                    <option value='optionHouse'>Préstamo Hipotecario</option>
                    <option value='optionAccount'>Cuentas Vista</option>
                </Select>)
            } else if(querySelect==='segment') {
                return(
                    <Select w='fit-content' placeholder='Selecciona el valor' onChange={handleChangeValue}>
                        <option value='optionYoung'>Jóvenes</option>
                        <option value='optionStan'>Standard</option>
                        <option value='optionPrem'>Premium</option>
                    </Select>)
            }
        }
    }

    useEffect(() => {
        setIsLoaded(false)
        const products = Promise(getAllProducts)
        .then(()=>{
            setProducts(products)
            setIsLoaded(true)
        }).catch(error => {
            setIsLoaded(true)
            setError(true)
        })
         
    }, [])

    if (error) {
        return (
            <Alert status='error' display='flex' flexDir='row' alignItems='center'>
                <AlertIcon />
                <Box display='flex' flexDir='column'>
                    <AlertTitle>¡Error!</AlertTitle>
                    <AlertDescription>Tuvimos un problema obteniendo los registros. Por favor, contáctate con un asesor.</AlertDescription>
                </Box>
            </Alert>
        );
    } else if (!isLoaded) {
        return (
            <Container display='flex' justifyContent='center' minW='100%' p='0'>
                <Spinner size='lg' />
            </Container>
        );
    } else {
        return (
            <Container display='flex' flexDir='column' minW='100%' p='0'>
                <Container display='flex' flexDir={['column', 'column', 'row']} alignItems='flex-start' justifyContent={['flex-start', 'flex-start', 'space-between']} gap='2rem' minW='100%' mb='1rem' p='0'>
                    <Container w='100%' justifyContent='space-between' display='flex' flexDir={['row', 'row', 'column']} alignItems={['center', 'center', 'flex-start']} m='0'>
                        <Box display='flex' alignItems={['flex-start', 'flex-start', 'center']} flexDir={['column', 'row', 'row']} gap='1rem'>
                            <Menu closeOnSelect={false}>
                                <MenuButton as={Button} colorScheme='teal'>
                                    Consultar productos
                                </MenuButton>
                                <MenuList minWidth='fit-content'>
                                    <MenuOptionGroup onChange={handleChangeQuery} defaultValue='all' title='Tipo de consulta' type='radio'>
                                        <MenuItemOption value='all'>Todos los productos</MenuItemOption>
                                        <MenuItemOption value='productType'>Tipo de Producto</MenuItemOption>
                                        <MenuItemOption value='segment'>Segmento de Cliente</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </Menu>

                            {
                                selectOptions()
                            }
                            
                            
                        </Box>

                    </Container>

                    <Container w='100%' display='flex' flexDir={['row', 'row', 'column']} alignItems={['center', 'center', 'flex-start']} m='0' justifyContent='space-between'>
                        <Text fontWeight='semibold'>Filtrar productos automotores</Text>
                        <Box>
                            <RadioGroup defaultValue='1' onChange={handleChangeRadio}>
                                <Stack direction='row'>
                                    <Radio value='1'>Todos</Radio>
                                    <Radio value='2'>Carro</Radio>
                                    <Radio value='3'>Camioneta</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>

                    </Container>
                </Container>

                <TableComponent data={items} resetFunction={resetFunction} />
            </Container>
        )
    }
}
