'use client';

import { Box, Button, Typography, IconButton, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';

export default function HomePage() {
    const router = useRouter();

    const openChatPage = () => {
        router.push('/home'); // Adjust the path to where your chat page is located
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={4}
            sx={{
                backgroundColor: 'black',
                color: '#333',
                overflow: 'hidden',
            }}
        >
            <Stack
                direction="column"
                spacing={4}
                width="100%"
                maxWidth="1200px"
                bgcolor="#1c1c1c"
                borderRadius={2}
                boxShadow={3}
                p={4}
                alignItems="center"
                color = "white"
                sx={{ height: '80%', maxHeight: '700px', overflowY: 'auto' }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to AspireBot
                </Typography>
                <Typography variant="h5" paragraph textAlign="center">
                    Meet AspireBot, your personal career development coach. AspireBot is here to guide you through the various stages of your career journey, from skill enhancement to job preparation.
                </Typography>
                
                <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <InfoIcon sx={{ fontSize: 60, color: '#007bff', mb: 2 }} />
                        <Typography variant="h6" textAlign="center">Career Guidance</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <BuildIcon sx={{ fontSize: 60, color: '#28a745', mb: 2 }} />
                        <Typography variant="h6" textAlign="center">Skill Development</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <WorkIcon sx={{ fontSize: 60, color: '#dc3545', mb: 2 }} />
                        <Typography variant="h6" textAlign="center">Job Preparation</Typography>
                    </Box>
                </Stack>

                <Typography variant="body1" paragraph textAlign="center">
                    Whether you need help with resume building, interview preparation, or exploring career opportunities, AspireBot is ready to provide personalized support tailored to your needs.
                </Typography>

                <Button variant="contained" color="primary" onClick={openChatPage} sx={{ mt: 2 }}>
                    Get Started
                </Button>
            </Stack>

            {/* Chatbot Icon */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
                onClick={openChatPage}
            >
                <ChatIcon />
            </IconButton>
        </Box>
    );
}
