import { Box, Typography, Button, Tooltip, Grid } from "@mui/material";
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const stats = [
    {
      icon: <MovieIcon sx={{ fontSize: 40, color: '#ff0000' }} />,
      value: "10K+",
      label: "Movies"
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: '#ffd700' }} />,
      value: "4.8",
      label: "Average Rating"
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#ff0000' }} />,
      value: "1M+",
      label: "Users"
    },
    {
      icon: <LocalMoviesIcon sx={{ fontSize: 40, color: '#ffd700' }} />,
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
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'wheat' }}>
          MovieFlix is your Best choice
        </Typography>
        <Typography variant="body2" sx={{ maxWidth: '700px', lineHeight: 1.8, padding: 2, color: 'gray' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aliquam est quaerat recusandae repudiandae dolores eos esse quisquam, ipsum voluptate ullam quis dignissimos illum aperiam totam eum dolorem, asperiores doloremque.
        </Typography>
        <Box sx={{ display: "flex", gap: 4, flexDirection: "column", alignItems: "center" }}>
          <Tooltip title="Contact us">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                sx={{ 
                  background: 'red', 
                  color: 'white',
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

          <Grid container spacing={4} sx={{ maxWidth: '800px', mt: 2 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                      }
                    }}
                  >
                    {stat.icon}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

      <ContactModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
