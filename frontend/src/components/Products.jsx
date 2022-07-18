import { React, useCallback, useEffect, useState } from 'react'
import { Container, Box, Text, Menu, MenuButton, Stack, RadioGroup, Radio, MenuList, Button, MenuItemOption, MenuOptionGroup, Select } from '@chakra-ui/react'
import TableProducts from './TableProducts'
import { queryOptions, filterOptions, queryValues, optionAllProducts, optionByType, optionBySegment, getRouteProductType, getRouteSegmentType, getAdquisitionId, queryOptionVehicleKey, getRouteAllProducts } from '../config'
import ErrorMessage from './ErrorMessage'
import LoadingAnimation from './LoadingAnimation'

export default function Products({ products, completeProducts, status, onChangeStatus, onChangeApiUrl, onChangeProducts, updateTableState, onUpdateTable }) {
    const [selectedQueryOption, setSelectedQueryOption] = useState(optionAllProducts)
    const [selectedQueryValue, setSelectedQueryValue] = useState(optionAllProducts)
    const [viewFilters, setViewFilters] = useState(true)
    const [selectedFilterOption, setSelectedFilterOption] = useState(optionAllProducts)

    const handleChangeQueryOption = useCallback(() => {
        setSelectedQueryValue(optionAllProducts)
        onChangeApiUrl(getRouteAllProducts)
    }, [onChangeApiUrl])

    const handleChangeQueryValue = useCallback(() => {
        setViewFilters(true)
        if (selectedQueryOption === optionByType) {
            queryValues.productType.every(option => {
                if (selectedQueryValue === option.key) {
                    onChangeApiUrl(getRouteProductType(option.id))
                    if (option.key !== queryOptionVehicleKey) {
                        setViewFilters(false)
                        setSelectedFilterOption(optionAllProducts)
                    }
                    return false
                } else {
                    return true
                }
            })
        } else if (selectedQueryOption === optionBySegment) {
            queryValues.segmentType.every(option => {
                if (selectedQueryValue === option.key) {
                    onChangeApiUrl(getRouteSegmentType(option.id))
                    return false
                } else {
                    return true
                }
            })
        }
    }, [selectedQueryValue, onChangeApiUrl, selectedQueryOption])

    const handleChangeFilterValue = useCallback(() => {
        onChangeStatus({ failed: null, errorMessage: null, loaded: false })
        if (selectedFilterOption !== optionAllProducts) {
            const filteredProducts = []
            if (completeProducts) {
                completeProducts.forEach(product => {
                    const productAdquisitionId = getAdquisitionId(product)
                    if (productAdquisitionId) {
                        filterOptions.every(option => {
                            const filterOptionId = option.id
                            const filterOptionKey = option.key
                            if (filterOptionKey === selectedFilterOption) {
                                if (productAdquisitionId === filterOptionId) {
                                    filteredProducts.push(product)
                                    return false
                                }
                            }
                            return true
                        })
                    }
                })
            }
            onChangeProducts(filteredProducts)
        } else {
            onChangeProducts(completeProducts)
        }
        onChangeStatus({ failed: false, errorMessage: null, loaded: true })
    }, [completeProducts, selectedFilterOption, onChangeProducts, onChangeStatus])

    useEffect(() => {
        handleChangeQueryOption()
    }, [selectedQueryOption, handleChangeQueryOption])

    useEffect(() => {
        handleChangeQueryValue()
    }, [selectedQueryValue, handleChangeQueryValue])

    useEffect(() => {
        handleChangeFilterValue()
    }, [selectedFilterOption, handleChangeFilterValue])


    const createQueryContainer = () => {
        if (selectedQueryOption !== optionAllProducts) {
            if (selectedQueryOption === optionByType) {
                return (
                    <Select w='fit-content' isDisabled={status?.failed || !status?.loaded ? true : false} onChange={(e) => setSelectedQueryValue(e.target.value)} value={selectedQueryValue}>
                        <option value={optionAllProducts}>Selecciona el valor</option>
                        <option value='optionAuto'>Préstamo Automotor</option>
                        <option value='optionHouse'>Préstamo Hipotecario</option>
                        <option value='optionAccount'>Cuentas Vista</option>
                    </Select>)
            } else if (selectedQueryOption === optionBySegment) {
                return (
                    <Select w='fit-content' isDisabled={status?.failed || !status?.loaded ? true : false} onChange={(e) => setSelectedQueryValue(e.target.value)} value={selectedQueryValue}>
                        <option value={optionAllProducts}>Selecciona el valor</option>
                        <option value='optionYoung'>Jóvenes</option>
                        <option value='optionStan'>Standard</option>
                        <option value='optionPrem'>Premium</option>
                    </Select>)
            }
        }
    }

    const createFilterContainer = () => {
        return (
            <Container w='100%' display='flex' gap='0.5rem' flexDir={['column', 'row', 'column']} alignItems={['flex-start', 'center', 'flex-start']} m='0' justifyContent='space-between'>
                <Text fontWeight='semibold'>Filtrar productos automotores</Text>
                <Box>
                    <RadioGroup isDisabled={status?.failed || !status?.loaded ? true : false} colorScheme='teal' onChange={(e) => setSelectedFilterOption(e)} value={selectedFilterOption}>
                        <Stack direction='row'>
                            {
                                filterOptions ? filterOptions.map((option, i) =>
                                    <Radio key={i} value={option.key}>{option.name}</Radio>) : null
                            }
                        </Stack>
                    </RadioGroup>
                </Box>
            </Container>
        )
    }

    return (
        <Container display='flex' flexDir='column' minW='100%' p='0'>
            <Container display='flex' flexDir={['column', 'column', 'row']} alignItems='flex-start' justifyContent={['flex-start', 'flex-start', 'space-between']} gap='2rem' minW='100%' mb='1rem' p='0'>
                <Container w='100%' justifyContent='space-between' display='flex' flexDir={['row', 'row', 'column']} alignItems={['center', 'center', 'flex-start']} m='0'>
                    <Container w='100%' display='flex' gap='0.5rem' flexDir={['column', 'row', 'column']} alignItems={['flex-start', 'center', 'flex-start']} m='0' p='0' justifyContent='space-between'>
                    <Text fontWeight='semibold'>Consultar listado de productos</Text>
                    <Box display='flex' alignItems={['flex-start', 'flex-start', 'flex-start', 'center']} flexDir={['row', 'row', 'column', 'row']} gap='1rem'>
                        <Menu closeOnSelect={false}>
                            <MenuButton minWidth='fit-content' as={Button} colorScheme='teal'>
                                Tipo de consulta
                            </MenuButton>
                            <MenuList minWidth='fit-content'>
                                <MenuOptionGroup onChange={(e) => setSelectedQueryOption(e)} value={selectedQueryOption} title='Tipo de consulta' type='radio'>
                                    {
                                        queryOptions ? queryOptions.map((option, i) =>
                                            <MenuItemOption key={i} value={option.key}>{option.name}</MenuItemOption>
                                        ) : null
                                    }
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>

                        {
                            queryOptions !== optionAllProducts ? createQueryContainer() : null
                        }

                    </Box>
                    </Container>
                    

                </Container>

                {
                    viewFilters ? createFilterContainer() : null
                }

            </Container>

            {
                status?.failed ? <ErrorMessage message={status.errorMessage} /> :
                    status?.loaded ?
                        <TableProducts data={products} status={status} updateTableState={updateTableState} onUpdateTable={onUpdateTable} />
                        : <LoadingAnimation/>
            }


        </Container>
    )
}