var quizzes = {

  "AWS": [
    {q:"Which AWS service provides managed relational databases?", a:1, opts:["DynamoDB","RDS","Redshift","ElastiCache"]},
    {q:"What does S3 stand for?", a:2, opts:["Simple Server Storage","Simple Scalable Store","Simple Storage Service","Secure Storage System"]},
    {q:"Which service is AWS's serverless compute offering?", a:0, opts:["Lambda","EC2","ECS","Fargate"]},
    {q:"What is the AWS global content delivery network?", a:3, opts:["Route 53","Global Accelerator","API Gateway","CloudFront"]},
    {q:"Which AWS service is used for Infrastructure as Code?", a:1, opts:["CodeDeploy","CloudFormation","OpsWorks","Elastic Beanstalk"]},
    {q:"EC2 stands for:", a:0, opts:["Elastic Compute Cloud","Efficient Cloud Computing","Extended Container Cloud","Enterprise Compute Cluster"]},
    {q:"Which service handles DNS in AWS?", a:2, opts:["CloudFront","ELB","Route 53","VPC"]},
    {q:"What type of database is DynamoDB?", a:3, opts:["Relational","Graph","Time-series","NoSQL key-value"]},
    {q:"Which AWS service sends notifications (email, SMS, etc.)?", a:1, opts:["SQS","SNS","SES","EventBridge"]},
    {q:"What is the default storage class in S3?", a:0, opts:["S3 Standard","S3 Intelligent-Tiering","S3 One Zone-IA","S3 Glacier"]}
  ],

  "Docker": [
    {q:"What command builds a Docker image from a Dockerfile?", a:2, opts:["docker run","docker pull","docker build","docker create"]},
    {q:"Which file defines a multi-container Docker application?", a:0, opts:["docker-compose.yml","Dockerfile","docker.json","compose.yaml"]},
    {q:"What does 'docker ps' show?", a:1, opts:["All images","Running containers","Stopped containers","Docker networks"]},
    {q:"Which instruction in a Dockerfile sets the base image?", a:3, opts:["COPY","RUN","FROM ... AS base","FROM"]},
    {q:"What flag runs a container in detached (background) mode?", a:0, opts:["-d","--bg","--detach","--run"]},
    {q:"How do you expose a host port 8080 to container port 80?", a:2, opts:["--port 8080","--expose 80:8080","-p 8080:80","-p 80:8080"]},
    {q:"What command removes all stopped containers?", a:1, opts:["docker rm","docker container prune","docker rmi","docker system prune"]},
    {q:"Which Docker object is a read-only template for containers?", a:3, opts:["Container","Volume","Network","Image"]},
    {q:"What is a Docker layer?", a:0, opts:["A cached filesystem diff from a Dockerfile instruction","A network bridge","A named volume","A running process"]},
    {q:"What command lists locally available Docker images?", a:2, opts:["docker ps","docker containers ls","docker images","docker image ls --all"]}
  ],

  "Python": [
    {q:"Which keyword is used to define a function in Python?", a:1, opts:["function","def","fun","lambda"]},
    {q:"What does 'len([1,2,3])' return?", a:0, opts:["3","2","1","Error"]},
    {q:"Which of these is a Python list comprehension?", a:2, opts:["[for x in range(5)]","(x*2 : x in range(5))","[x*2 for x in range(5)]","list{x*2, x in range(5)}"]},
    {q:"What is the output of 'print(type([]))'?", a:3, opts:["<class 'tuple'>","<class 'dict'>","<class 'set'>","<class 'list'>"]},
    {q:"Which method removes and returns the last item of a list?", a:1, opts:["remove()","pop()","delete()","discard()"]},
    {q:"What does PEP 8 define?", a:0, opts:["Python style guide","Python Enhancement Proposal for bytes","Python standard library","Package manager spec"]},
    {q:"What keyword exits a loop immediately?", a:2, opts:["exit","continue","break","pass"]},
    {q:"Which data structure maps keys to values?", a:3, opts:["list","tuple","set","dict"]},
    {q:"What does 'yield' do in a function?", a:0, opts:["Makes it a generator","Raises an exception","Returns a value and exits","Pauses for async"]},
    {q:"What is the result of 7 // 2 in Python 3?", a:1, opts:["3.5","3","4","2"]}
  ],

  "Kafka": [
    {q:"What is a Kafka topic?", a:2, opts:["A consumer group","A broker cluster","A named stream of records","A message acknowledgment"]},
    {q:"What is a Kafka partition?", a:0, opts:["An ordered, immutable sequence of records","A group of consumers","A broker replica","A producer connection"]},
    {q:"Which component stores messages in Kafka?", a:3, opts:["Producer","Consumer","ZooKeeper","Broker"]},
    {q:"What does a Kafka consumer group ensure?", a:1, opts:["Ordering across partitions","Each partition is read by one consumer in the group","Messages are deleted after reading","Producers are balanced"]},
    {q:"What is the default message retention period in Kafka?", a:2, opts:["1 hour","12 hours","7 days","30 days"]},
    {q:"What guarantees message ordering in Kafka?", a:0, opts:["Within a single partition","Across all partitions","Across topics","Via consumer groups"]},
    {q:"What is Kafka Streams?", a:3, opts:["A broker replication tool","A consumer offset tracker","A schema registry","A library for stream processing on Kafka"]},
    {q:"What replaced ZooKeeper in newer Kafka versions?", a:1, opts:["etcd","KRaft (Kafka Raft)","Consul","Paxos"]},
    {q:"Which parameter controls how long a producer waits for broker acks?", a:2, opts:["linger.ms","batch.size","acks","retries"]},
    {q:"What is a Kafka offset?", a:0, opts:["A unique ID for each message within a partition","A partition replica count","A broker ID","A consumer heartbeat"]}
  ]

};
