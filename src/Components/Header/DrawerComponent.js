import { IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useState } from 'react';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { useNavigate } from 'react-router-dom';

const DrawerComponent = () => {

    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState(false);

    const listItems = [
        { name: 'Stt', path: "/stt" },
        { name: 'View', path: "/view" },
        { name: 'EvaluationPlayer', path: "/evaluationplayer" },
        { name: 'Diarization', path: "/diarization" },
    ]

    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    {
                        listItems.map((page, index) => (
                            <ListItemButton onClick={() => navigate(`${page.path}`)} key={index}>
                                <ListItemIcon>
                                    {page.icon}
                                </ListItemIcon>
                                <ListItemText>{page.name}</ListItemText>
                            </ListItemButton>
                        ))
                    }

                </List>
            </Drawer>

            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuOutlinedIcon sx={{ color: "#fff", marginInlineRight: "5px" }} />
            </IconButton>
        </>
    )
}

export default DrawerComponent;