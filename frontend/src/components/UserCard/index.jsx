import React from 'react'
import {
    Flex,
    Text,
    Image
} from "@chakra-ui/react"


export default function index({ user, selectedUser, setSelectedUser }) {
    return (
        <Flex
            key={user.username}
            w="200px"
            h="50px"
            gap="4"
            p="4"
            rounded="md"
            color="white"
            alignItems="center"
            cursor="pointer"
            backgroundColor={(selectedUser && selectedUser.username === user.username) ? "rgba(72, 128, 255, 1)" : "rgba(72, 128, 255, 0)"}
            _hover={{
                backgroundColor: (selectedUser && selectedUser.username === user.username) ? "rgba(72, 128, 255, 1)" : "rgba(72, 128, 255, 0.5)"
            }}
            transitionProperty="background-color"
            transitionDuration="0.3s"
            transitionTimingFunction="ease-in-out"
            onClick={() => setSelectedUser(user)}
        >
            <Image 
                src={user.pfp}
                alt={`${user.username}'s profile picture`}
                w="10"
                h="10"
            />
            <Text>
                @{user.username}
            </Text>
        </Flex>
    )
}
