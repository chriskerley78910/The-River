
library(dplyr)
library(RMariaDB)

# cross validation: How well does the model predict 
# on data it has not seen before?
# http://www.sthda.com/english/articles/38-regression-model-validation/157-cross-validation-essentials-in-r/#the-validation-set-approach

# predictor,  novelty.
# response, photo viewing time.


# Novelty ranges between just seen and have never seen.
# Have never seen would be infinite novelty
# Just seen would be one photo right after another.

storiesDb <- dbConnect(RMariaDB::MariaDB(), user='chris', password='devpassword', dbname='river', host='localhost')
dbListTables(storiesDb)

query_photos = 'select * from viewing_samples order by photo_id, served_at'
rs <-dbSendQuery(storiesDb, query_photos)
dbHasCompleted(rs)
df <- dbFetch(rs, n = -1)
dbDisconnect(storiesDb)
df<-df[complete.cases(df),]




last_photo_id = NULL
cur_photo_id = NULL


#Japan Population Data Frame - Step 1    
rest_intervals_df <- data.frame()


#Naming the Data Frame - Step 2  


for(i in 1:nrow(df)) {
  cur_photo_id = df$photo_id[i]
  if(is.null(last_photo_id)){
    last_photo_id = cur_photo_id
    next
  } 
  if(cur_photo_id == last_photo_id){
    
    
    prev_index = i - 1
    cur_index = i
    
    last_started_at = df$served_at[prev_index]
    last_ended_at   = df$next_requested_at[prev_index]
    
    cur_started_at = df$served_at[cur_index]   
    cur_ended_at =   df$next_requested_at[cur_index]
   
    rest_interval = cur_started_at - last_ended_at
    
    dur = cur_ended_at - cur_started_at
  
    new_observation = data.frame(cur_photo_id, rest_interval, dur)  
    
    rest_intervals_df = rbind(rest_intervals_df, new_observation)  
   
    
  } 
  last_photo_id = cur_photo_id
  i = i + 1
}
names(rest_intervals_df) <- c("photo_id", "resting_time",'view_duration') 
rest_intervals_df

rest_intervals_df$resting_time.numeric = as.numeric(rest_intervals_df$resting_time)
rest_intervals_df$view_duration.numeric = as.numeric(rest_intervals_df$view_duration)

lm = lm(view_duration.numeric ~ resting_time.numeric, data=rest_intervals_df)

plot(rest_intervals_df$resting_time.numeric, 
     rest_intervals_df$view_duration.numeric,
     xlab='Resting Time (Sec)',
     ylab='Viewing Time (Sec)'
     )


# novelty, time since last viewing.

linear_model = lm(mpg ~ horsepower + poly(horsepower, 2), data=Viewing)

# diagnostics 

#show residuals
prediction_col = predict ( linear_model )
residuals_col = residuals ( linear_model )
student_residuals_col = rstudent( linear_model )

plot ( prediction_col , residuals_col , main='Residuals' )
plot ( prediction_col,  student_residuals_col, main='Studentized Residuals')

# check for non-linearity.
plot ( hatvalues ( linear_model ) )

# Split the data into training and test set
library(dplyr)
library(caret)
set.seed(123)

# split into training data and test data. (50/50)
training.samples <- Auto$mpg %>% createDataPartition(p = 0.5, list = FALSE)
train.data  <- Auto[training.samples, ]
test.data <- Auto[-training.samples, ]

# Build the model using the training data.
model <- lm(mpg ~ horsepower + poly(horsepower, 2), data = train.data)

# Make predictions and compute the R2, RMSE and MAE
predictions <- model %>% predict(test.data)
analysis = data.frame( R2 = R2(predictions, test.data$mpg),
                       RMSE = RMSE(predictions, test.data$mpg),
                       MAE = MAE(predictions, test.data$mpg))
RMSE = analysis[2][1]
RMSE
test_error_rate = RMSE / mean(test.data$mpg)
test_error_rate  
# err
# 0.2077 degree 1
# 0.1830 degree 2
# 0.1836 degree 3

# if error rate is 0.2077 it means its wrong 20.8% of the time it is wrong.
hist ( Auto$mpg , col =2 , breaks =15)
x_values =  seq(10, 160, 1)
y_values =  seq(50, 200, 1)

points = list(mpg=x_values, horsepower=y_values)
predictedMPG <- predict(model, points)

plot(test.data$mpg, test.data$horsepower, pch=16, xlab = "MPG", ylab = "Horse Power", cex.lab = 1.3, col = "blue")
lines(predictedMPG, y_values, col = "green", lwd = 3)
