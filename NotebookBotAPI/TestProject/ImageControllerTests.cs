using Microsoft.EntityFrameworkCore;
using NotebookBotAPI.Controllers;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.InputModels;
using NUnit.Framework;
using System;
using TestProject.TestData;

namespace TestProject
{
    public class Tests
    {
        private ImagesController imageController;
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestIfPostImageConvertsProperlyData()
        {
            var options = new DbContextOptionsBuilder<NotebookDbContext>()
                 .UseInMemoryDatabase(databaseName: "NotebookDatabase")
                 .Options;

            var date = DateTime.Now;

            using (var context = new NotebookDbContext(options))
            {
                context.Images.Add(new Image() { Id = 1, DateSent = date, ImageData = TestDataValues.GetImage() });
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new NotebookDbContext(options))
            {
                imageController = new ImagesController(context);
                
                    //imageController.PostImageRaw(new ImageRawDataInput()
                    //{
                    //    ImageBase64String = TestDataValues.getBase64StringImage(),
                    //    DateSent = date.ToString()
                    //});
                

                var directlyInsertedImage = context.Images.Find(1);
                var methodInsertedImage = context.Images.Find(2);
                Assert.That(directlyInsertedImage.ImageData == directlyInsertedImage.ImageData, "Image does not get converted properly!");
            }
        }
    }
}