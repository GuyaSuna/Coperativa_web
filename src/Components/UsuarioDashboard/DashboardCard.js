import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent
          className="dark:bg-gray-700 bg-gray-500" // Cambié el color de fondo en modo oscuro
          sx={{ p: "10px" }} // Ajusta el padding según lo que necesites
        >
          <Typography variant="h5" color="textPrimary">
            {headtitle}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent
          sx={{ p: "10px" }}
          className="dark:bg-gray-800 bg-white dark:text-black text-white" // Ajusté los colores de fondo y texto
        >
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title && <Typography variant="h5">{title}</Typography>}
                {subtitle && (
                  <Typography variant="subtitle2">{subtitle}</Typography>
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
