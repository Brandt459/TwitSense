import React from 'react'
import {
    Box,
    Flex,
    Heading,
    Text,
    Icon,
    VStack
} from "@chakra-ui/react"
import UserCard from '../UserCard'
import { FaUser } from "react-icons/fa6"


export default function index({ selectedUser, setSelectedUser, selectedUserInfo }) {
    return (
        <Box
            h="full"
            w="full"
            p="10"
        >
            {selectedUser &&
                <>
                    <Flex
                        gap="20"
                    >
                        <Box>
                            <Heading
                                fontWeight="extrabold"
                                fontSize="32px"
                                color="white"
                            >
                                Now Analyzing:
                            </Heading>
                            <Box
                                m="4" 
                            >
                                <UserCard 
                                    user={selectedUser}
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                />
                            </Box>
                        </Box>
                        <VStack
                            spacing="5"
                        >
                            <Flex
                                p="4"
                                rounded="xl"
                                bg="darkBlue"
                                borderWidth="1px"
                                borderColor="slateBlue"
                                gap="20"
                            >
                                <Box>
                                    <Text
                                        color="#bec1c6"
                                        fontWeight="semibold"
                                        fontSize="16px"
                                    >
                                        Personality
                                    </Text>
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="28px"
                                        mt="2"
                                    >
                                        ENTP
                                    </Text>
                                </Box>
                                <Box
                                    bg="purple"
                                    p="4"
                                    borderRadius="25%"
                                    w="14"
                                    h="14"
                                >
                                    <Icon
                                        as={FaUser}
                                        color="white"
                                        boxSize="6"
                                    />
                                </Box>
                            </Flex>
                            <Flex
                                p="4"
                                rounded="xl"
                                bg="darkBlue"
                                borderWidth="1px"
                                borderColor="slateBlue"
                                gap="20"
                            >
                                <Box>
                                    <Text
                                        color="#bec1c6"
                                        fontWeight="semibold"
                                        fontSize="16px"
                                    >
                                        Total Posts
                                    </Text>
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="28px"
                                        mt="2"
                                    >
                                        {selectedUserInfo?.total_submissions}
                                    </Text>
                                </Box>
                                <Box
                                    bg="purple"
                                    p="4"
                                    borderRadius="25%"
                                    w="14"
                                    h="14"
                                >
                                    <Icon
                                        as={FaUser}
                                        color="white"
                                        boxSize="6"
                                    />
                                </Box>
                            </Flex>
                        </VStack>
                    </Flex>
                </>
            }
        </Box>
    )
}
