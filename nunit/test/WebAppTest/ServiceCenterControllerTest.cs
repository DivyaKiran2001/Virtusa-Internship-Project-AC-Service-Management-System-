using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApp.Controllers;
using WebApp.Infrastructure;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using Xunit;
 
namespace WebAppTest
{
    public class ServiceCenterControllerTest
    {
        [Fact]
        public void Test_GET_AllServiceCenters()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.ServiceCenters).Returns(Multiple());
            var controller = new ServiceCenterController(mockRepo.Object);
 
            // Act
            var result = controller.Get();
 
            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<ServiceCenter>>(result);
            Assert.Equal(3, model.Count());
        }
 
        private static IEnumerable<ServiceCenter> Multiple()
        {
            var r = new List<ServiceCenter>();
            r.Add(new ServiceCenter()
            {
                serviceCenterID = 01,
                serviceCenterName = "Mob Service",
                serviceCenterPhone = "9876543210",
                serviceCenterAddress = "cross street road",
                serviceCenterImageUrl = "mobile.png",
                serviceCentermailId = "mobemail@gmail.com",
                serviceCenterDescription = "good service"
            });
            r.Add(new ServiceCenter()
            {
                serviceCenterID = 02,
                serviceCenterName = "Mob Service",
                serviceCenterPhone = "9876543210",
                serviceCenterAddress = "cross street road",
                serviceCenterImageUrl = "mobile.png",
                serviceCentermailId = "mobemail@gmail.com",
                serviceCenterDescription = "good service"
            });
            r.Add(new ServiceCenter()
            {
                serviceCenterID = 03,
                serviceCenterName = "Mob Service",
                serviceCenterPhone = "9876543210",
                serviceCenterAddress = "cross street road",
                serviceCenterImageUrl = "mobile.png",
                serviceCentermailId = "mobemail@gmail.com",
                serviceCenterDescription = "good service"
            });
            return r;
        }

        [Fact]
        public void Test_POST_AddServiceCenter()
        {
            // Arrange
            ServiceCenter r = new ServiceCenter()
            {
                serviceCenterID = 04,
                serviceCenterName = "Mob Service",
                serviceCenterPhone = "9876543210",
                serviceCenterAddress = "cross street road",
                serviceCenterImageUrl = "mobile.png",
                serviceCentermailId = "mobemail@gmail.com",
                serviceCenterDescription = "good service"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.AddServiceCenter(It.IsAny<ServiceCenter>())).Returns(r);
            var controller = new ServiceCenterController(mockRepo.Object);
        
            // Act
            var result = controller.Post(r);
        
            // Assert
            var serviceCenter = Assert.IsType<ServiceCenter>(result);
            Assert.Equal(04, serviceCenter.serviceCenterID);
            Assert.Equal("Mob Service", serviceCenter.serviceCenterName);
            Assert.Equal("9876543210", serviceCenter.serviceCenterPhone);
            Assert.Equal("cross street road", serviceCenter.serviceCenterAddress);
            Assert.Equal("mobile.png", serviceCenter.serviceCenterImageUrl);
            Assert.Equal("mobemail@gmail.com", serviceCenter.serviceCentermailId);
            Assert.Equal("good service", serviceCenter.serviceCenterDescription);

        }

        [Fact]
        public void Test_PUT_UpdateServiceCenter()
        {
            // Arrange
            ServiceCenter r = new ServiceCenter()
            {
                serviceCenterID = 01,
                serviceCenterName = "new Mob Service",
                serviceCenterPhone = "9876543210",
                serviceCenterAddress = "cross street road",
                serviceCenterImageUrl = "mobile.png",
                serviceCentermailId = "mobemail@gmail.com",
                serviceCenterDescription = "good service"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.UpdateServiceCenter(It.IsAny<ServiceCenter>())).Returns(r);
            var controller = new ServiceCenterController(mockRepo.Object);
        
            // Act
            var result = controller.Put(r);
        
            // Assert
            var serviceCenter = Assert.IsType<ServiceCenter>(result);
            Assert.Equal(01, serviceCenter.serviceCenterID);
            Assert.Equal("new Mob Service", serviceCenter.serviceCenterName);
            Assert.Equal("9876543210", serviceCenter.serviceCenterPhone);
            Assert.Equal("cross street road", serviceCenter.serviceCenterAddress);
            Assert.Equal("mobile.png", serviceCenter.serviceCenterImageUrl);
            Assert.Equal("mobemail@gmail.com", serviceCenter.serviceCentermailId);
            Assert.Equal("good service", serviceCenter.serviceCenterDescription);
        }

        [Fact]
        public void Test_DELETE_ServiceCenter()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.DeleteServiceCenter(It.IsAny<int>())).Verifiable();
            var controller = new ServiceCenterController(mockRepo.Object);
        
            // Act
            controller.Delete(3);
        
            // Assert
            mockRepo.Verify();
        }
    }
}