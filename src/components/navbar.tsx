import { Link } from "react-router-dom";
import { Box, Button, Typography, IconButton, Menu, MenuItem, useTheme, useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      sx={{
        background: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Left side - Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LocalMoviesIcon sx={{ 
          color: '#ff0000', 
          fontSize: isMobile ? '1.5rem' : '2rem' 
        }} />
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          MovieFlix
        </Typography>
      </Box>

      {/* Right side - Navigation buttons */}
      {isMobile ? (
        <>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                color: 'white',
              }
            }}
          >
            <MenuItem 
              component={Link} 
              to="/" 
              onClick={handleClose}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)'
                }
              }}
            >
              <HomeIcon sx={{ mr: 1 }} /> Home
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/favorites" 
              onClick={handleClose}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)'
                }
              }}
            >
              <FavoriteIcon sx={{ mr: 1 }} /> Favorites
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{ 
              color: 'white', 
              borderColor: 'red',
              '&:hover': {
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
              }
            }}
          >
            Home
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<FavoriteIcon />}
            component={Link}
            to="/favorites"
            sx={{ 
              color: 'white', 
              borderColor: 'red',
              '&:hover': {
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
              }
            }}
          >
            Favorites
          </Button>
        </Box>
      )}
    </Box>
  );
};
