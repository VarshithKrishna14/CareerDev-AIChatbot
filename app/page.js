'use client';

import { Box, Button, Stack, TextField, CircularProgress, Typography, AppBar, Toolbar } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState([{
        role: 'assistant',
        content: `Hello I am your AspireBot support agent, how can I help you today?`,
    }]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setMessages(prevMessages => [
            ...prevMessages,
            { role: "user", content: message },
            { role: "assistant", content: '' },
        ]);
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, { role: 'user', content: message }]),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].content = result;
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { role: "assistant", content: "Sorry, there was an error processing your request." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const goToHomePage = () => {
        router.push('/home'); // Adjust the path as necessary
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            bgcolor="black"
            color="#ffffff"
        >
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: '#1c1c1c', borderBottom: '1px solid #333' }}>
                <Toolbar>
                    <Button color="inherit" onClick={goToHomePage} sx={{ display: { xs: 'none', md: 'block' } }}>
                        Home
                    </Button>
                    <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
                        AspireBot
                    </Typography>
                    <Button color="primary" onClick={goToHomePage}>
                        Know More
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                width="100%"
                height="calc(100% - 64px)" // Adjusting height to account for navbar
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={2}
                sx={{
                    '@media (max-width:600px)': {
                        p: 1,
                    },
                }}
            >
                <Stack
                    direction="column"
                    width="100%"
                    maxWidth="800px"
                    height="100%"
                    maxHeight="700px"
                    border="1px solid #333"
                    borderRadius={2}
                    p={2}
                    spacing={3}
                    bgcolor="#2c2c2c"
                    overflow="hidden"
                    sx={{
                        '@media (max-width:600px)': {
                            maxWidth: '95%',
                            maxHeight: '90%',
                            p: 1,
                        },
                    }}
                >
                    <Stack direction="column" spacing={2} flexGrow={1} overflow="auto">
                        {
                            messages.map((msg, index) => (
                                <Box key={index} display='flex' justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}>
                                    <Box
                                        bgcolor={msg.role === 'assistant' ? '#333' : '#007bff'}
                                        color="#ffffff"
                                        borderRadius={16}
                                        p={2}
                                        maxWidth="80%"
                                    >
                                        {msg.content}
                                    </Box>
                                </Box>
                            ))
                        }
                        {loading && <CircularProgress color="inherit" />}
                    </Stack>
                    <Stack direction='row' spacing={2} alignItems="center">
                        <TextField
                            label="Type a message"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ bgcolor: '#3c3c3c', '& .MuiInputBase-input': { color: '#ffffff' } }}
                            InputLabelProps={{ sx: { color: '#999' } }}
                        />
                        <Button
                            variant="contained"
                            onClick={sendMessage}
                            sx={{ bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
                            disabled={loading}
                        >
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
