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
          className="bg-gray-100 dark:bg-gray-800"
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
          className="bg-white dark:bg-gray-900 text-black dark:text-white"
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
