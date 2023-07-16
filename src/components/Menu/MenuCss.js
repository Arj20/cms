import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "1rem",
    marginTop: "1rem",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  popover: {
    padding: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "0.5rem",
  },
  MenuSearch: {
    width: "100%",
    marginTop: "1rem",
    fontSize: "1.4rem",
    display: "flex",
    flexDirection: "column",
  },
  MainMenuOptions: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignContent: "baseline",
  },
  MainMenuCard: {
    maxWidth: 345,
    lineHeight: "2rem",
    backgroundColor: "black",
  },
  MainnMenuTypography: {
    textAlign: "center",
  },
  MenuContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
  },
  MenuTabs: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0rem",
    borderBottom: "1px solid black",
  },
  TodayContainer: {
    width: "100%",
    marginTop: "1rem",
    fontSize: "1.4rem",
    display: "flex",
    flexDirection: "column",
  },
  TodaySort: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignContent: "baseline",
  },
  TodayList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },
  TodayListBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TodayCart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TodayListText: {
    display: "flex",
    justifyContent: "space-between",
  },
  TodayMenuGrid: {
    display: "flex",
    my: 2,
    flexDirection: "column",
  },
  TodayDateBox: {
    display: "flex",
    flexDirection: "row",
  },
  TodayBox: {
    color: "primary.main",
    flexGrow: 1,
  },
  TodayMenuCard: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "1rem",
  },
  TodayItemCard: {
    maxWidth: 345,
    lineHeight: "2rem",
  },
  TodayCardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
});
