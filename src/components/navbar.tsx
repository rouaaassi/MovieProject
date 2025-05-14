import { Link } from "react-router-dom";
import { Box, Button, Tooltip, tooltipClasses, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { motion } from "framer-motion";

export const Navbar = () => (
  <Box 
    className="text-white flex justify-between items-center px-8 py-4"
    sx={{
      background: 'rgba(0, 0, 0, 0.8)',
      position: 'fixed',
      mt:2,
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 50,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <div className="flex items-center gap-2">
      <LocalMoviesIcon sx={{ 
        color: '#ff0000', 
        fontSize: '2.5rem',
        filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))'
      }} />
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center',
          background: 'linear-gradient(45deg, #ff0000, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        MovieFlix
      </Typography>
    </div>

    <div className="flex gap-12">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
          sx={{ 
            color: 'white', 
            borderColor: 'red', 
            textTransform: 'none',
            padding: '8px 24px',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#ff6b6b',
              backgroundColor: 'rgba(255, 0, 0, 0.15)',
              boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)',
              transform: 'translateY(-2px)'
            },
            '& .MuiButton-startIcon': {
              marginRight: '8px',
              transition: 'transform 0.3s ease',
            },
            '&:hover .MuiButton-startIcon': {
              transform: 'scale(1.2)'
            }
          }}
        >
          Home
        </Button>
      </motion.div>

      <Tooltip
        title="Your favorite movies"
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                {
                  marginTop: '30px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                {
                  marginBottom: '30px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                {
                  marginLeft: '30px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                {
                  marginRight: '30px',
                },
            },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<FavoriteIcon />}
            component={Link}
            to="/favorites"
            sx={{ 
              color: 'white', 
              borderColor: 'red', 
              textTransform: 'none',
              padding: '8px 24px',
              fontSize: '1rem',
              fontWeight: 500,
              ml:2,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 0, 0, 0.15)',
                boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)',
                transform: 'translateY(-2px)'
              },
              '& .MuiButton-startIcon': {
                marginRight: '8px',
                transition: 'transform 0.3s ease',
              },
              '&:hover .MuiButton-startIcon': {
                transform: 'scale(1.2)'
              }
            }}
          >
            Favorites
          </Button>
        </motion.div>
      </Tooltip>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
      </motion.div>
    </div>
  </Box>
);
