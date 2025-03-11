import { Link } from "react-router-dom";
import { Box, Button, Tooltip, tooltipClasses, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

export const Navbar = () => (
  <Box 
    className="text-white flex justify-between items-center px-8 py-4"
    sx={{
      background: 'rgba(0, 0, 0, 0.6)',
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 50,
      backdropFilter: 'blur(5px)', 
    }}
  >
    <div className="flex  items-center gap-2">
      <OndemandVideoIcon sx={{ color: 'white', fontSize: '2rem' }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'red' }}>Mov</span>
        <span style={{ color: 'white' }}>Ieo</span>
      </Typography>
    </div>

    <div className="flex gap-4">
      <Button
        variant="outlined"
        color="error"
        startIcon={<HomeIcon />}
        component={Link}
        to="/"
        sx={{ color: 'white', borderColor: 'red', textTransform: 'none',margin:1 }}
      >
        Home
      </Button>

     
      <Tooltip
      title="your favorite movies"
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
      <Button
        variant="outlined"
        color="error"
        startIcon={<FavoriteIcon />}
        component={Link}
        to="/favorites"
        sx={{ color: 'white', borderColor: 'red', textTransform: 'none',margin:1 }}
      >Favorites</Button>
    </Tooltip>
    </div>
  </Box>
);
