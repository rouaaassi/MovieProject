import { Box, Typography, Button, Tooltip, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { ContactModal } from "../components/ContactModal";
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

interface IntroSectionProps {
  onContactClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const stats = [
    {
      icon: <MovieIcon sx={{ fontSize: isMobile ? 30 : 40, color: '#ff0000' }} />,
      value: "10K+",
      label: "Movies"
    },
    {
      icon: <StarIcon sx={{ fontSize: isMobile ? 30 : 40, color: '#ffd700' }} />,
      value: "4.8",
      label: "Average Rating"
    },
    {
      icon: <PeopleIcon sx={{ fontSize: isMobile ? 30 : 40, color: '#ff0000' }} />,
      value: "1M+",
      label: "Users"
    },
    {
      icon: <LocalMoviesIcon sx={{ fontSize: isMobile ? 30 : 40, color: '#ffd700' }} />,
      value: "24/7",
      label: "Available"
    }
  ];

  return (
    <>
      <motion.div 
        className="flex-grow flex flex-col justify-center items-center text-center gap-6 p-4" 
        variants={{ 
          hidden: { opacity: 0, y: 30 }, 
          visible: { opacity: 1, y: 0, transition: { duration: 1 } } 
        }}
        style={{
          maxWidth: isMobile ? '100%' : isTablet ? '800px' : '800px',
          margin: '0 auto',
          paddingTop: isMobile ? '60px' : '10px',
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? 3 : 3,
            width: '100%',
            maxWidth: isMobile ? '100%' : isTablet ? '600px' : '700px',
            mb: isMobile ? 4 : 8
          }}
        >
          <Typography 
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
            sx={{ 
              fontWeight: 'bold', 
              color: 'wheat',
              textAlign: 'center',
              px: isMobile ? 2 : 4,
            }}
          >
            MovieFlix is your Best choice
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              maxWidth: isMobile ? '100%' : isTablet ? '600px' : '700px', 
              lineHeight: 1.8, 
              padding: isMobile ? 1 : 1, 
              color: 'gray',
              textAlign: 'center'
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aliquam est quaerat recusandae repudiandae dolores eos esse quisquam, ipsum voluptate ullam quis dignissimos illum aperiam totam eum dolorem, asperiores doloremque.
          </Typography>
          
          <Tooltip title="Contact us">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                sx={{ 
                  background: 'red', 
                  color: 'white',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 1 : 1.5,
                  '&:hover': {
                    background: '#ff4444',
                    boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
                  }
                }} 
                onClick={handleOpenModal}
              >
                Contact us
              </Button>
            </motion.div>
          </Tooltip>
        </Box>

        <Grid 
          container 
          spacing={isMobile ? 2 : 4} 
          sx={{ 
            maxWidth: isMobile ? '100%' : isTablet ? '600px' : '800px', 
            px: isMobile ? 1 : 2
          }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: isMobile ? 1 : 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                      '& .stat-icon': {
                        transform: 'scale(1.2)',
                        color: '#ff4444'
                      }
                    }
                  }}
                >
                  <Box 
                    className="stat-icon"
                    sx={{ 
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    sx={{ 
                      color: 'gray',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <ContactModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
