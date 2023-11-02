import React from "react";

import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const NewsLetter = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox p={3}>
        <Grid container spacing={1}>
          <SoftBox sx={{ padding: "90px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros congue, interdum velit nec, hendrerit orci. Duis auctor, elit quis cursus convallis, lectus augue pretium lacus, ac accumsan erat eros vitae quam. Curabitur ultricies nisi metus, sit amet ornare elit lobortis eu. Ut nec gravida orci. Maecenas eget nulla sit amet nunc aliquam accumsan id quis est. Aliquam in consectetur augue. Praesent faucibus nulla id risus pellentesque, a tempor eros sollicitudin. Quisque imperdiet sit amet metus at porta. Nullam sagittis ac velit non aliquam. In hac habitasse platea dictumst. Nam et lobortis erat.

Nam ut condimentum quam, eget consequat nisl. Sed massa eros, placerat in tellus quis, tempus tempus arcu. Curabitur aliquam cursus purus vel ornare. Curabitur ut facilisis augue. Duis efficitur arcu quis mattis sagittis. Nam vulputate vestibulum turpis nec eleifend. Praesent vel lacus eget velit consectetur tincidunt. Ut dolor ante, faucibus vitae nisl vitae, bibendum faucibus sapien.

Suspendisse potenti. Nam placerat massa vitae lacus varius accumsan. Phasellus a dolor ac metus bibendum molestie. Nunc gravida lacinia arcu, nec ultrices ex lacinia sed. Ut rhoncus tristique lectus maximus mollis. Nulla porta in lectus vestibulum pharetra. Nulla tempor blandit nibh, in vestibulum justo vestibulum sit amet. Vestibulum in scelerisque ligula. Donec vestibulum porta quam in commodo. Maecenas vitae risus nibh. Morbi maximus dapibus pulvinar. Duis mollis consequat pellentesque. Etiam ac luctus magna. In et nulla volutpat, tincidunt neque sed, varius augue. Cras augue nulla, fringilla bibendum ultrices sit amet, volutpat vitae erat.

Vivamus erat nisi, lacinia in mollis et, vestibulum ac ipsum. Fusce viverra vehicula aliquet. Integer placerat sodales est eget convallis. Maecenas pulvinar massa posuere nisi ullamcorper, sit amet rhoncus augue semper. Aliquam erat volutpat. Integer imperdiet nisl feugiat elit posuere vestibulum. Morbi scelerisque porta tempor. Ut placerat ex eu orci scelerisque lobortis. Nam sed mauris lacinia, mollis nisl et, sagittis felis. Vivamus turpis nisl, molestie eu vestibulum non, faucibus at dolor. Nunc blandit, quam et sodales mollis, lacus ipsum laoreet elit, suscipit pulvinar est lectus ut lectus. Cras tristique ante sodales, luctus nibh ut, pulvinar leo. Donec eu mauris dictum, lacinia massa a, sagittis leo.

Nunc a viverra purus. Mauris rutrum condimentum dolor eu malesuada. Duis varius, mi tincidunt convallis malesuada, urna mauris varius erat, at accumsan diam nunc sed arcu. Donec consequat laoreet nulla a egestas. Vestibulum eu nisl eu massa ultricies aliquam vitae vel neque. Fusce porta urna id feugiat finibus. Sed congue tempus mi eu fringilla. Maecenas ornare, purus vitae pellentesque varius, turpis leo molestie lectus, vel varius lorem lacus nec nisl. Fusce dictum neque at fermentum rhoncus.
          </SoftBox>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
};

export default NewsLetter;
