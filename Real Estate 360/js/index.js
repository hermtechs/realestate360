//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

const featuredProperties = [];
const allProperties = [];
const forSaleProperties = [];
const forRentProperties = [];

const getEntryItems = async () => {
  const getproperties = await client.getEntries({ content_type: "properties" });
  // console.log(properties.items);
  const propertiesArray = getproperties.items;
  allProperties.push(propertiesArray);
  const allPropertiesItems = propertiesArray.map((items) => {
    // return items.fields.propertyName;
    // return items.fields;
    const {
      propertyName,
      priceInWords,
      priceInFigures,
      propertyType,
      propertSize,
      forRentSaleOrBoth,
      featuredProperty,
      propertyLocation,
    } = items.fields;
    // console.log(
    //   propertyName,
    //   priceInWords,
    //   priceInFigures,
    //   propertyType,
    //   propertSize,
    //   forRentSaleOrBoth,
    //   propertyLocation
    // );
  });

  const filterfeaturedProperties = propertiesArray.filter((property) => {
    return property.fields.featuredProperty === true;
  });

  const filterPropertiesforSale = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth === "sale";
  });
  const filterPropertiesforRent = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth === "rent";
  });

  featuredProperties.push(filterfeaturedProperties);
  forSaleProperties.push(filterPropertiesforSale);
  forRentProperties.push(filterPropertiesforRent);
  featuredItemsDOM();
  forSaleItemsDOM();
  forRentItemsDOM();
};

getEntryItems();
// console.log(allProperties, featuredProperties);

const featuredItemsDOM = () => {
  //mapping through each featuredItems array items
  const eachFeaturedItems = featuredProperties[0]
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        featuredProperty,
        propertyLocation,
      } = item.fields;
      return `
<div class="col-lg-4 col-md-6 wow fadeInUp featured-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a href=""><img class="img-fluid" src="img/re360-01.jpg" alt=""></a>
        <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
        <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
    </div>
    <div class="p-4 pb-0">
        <h5 class="text-primary mb-3">UGX ${priceInFigures}</h5>
        <a class="d-block h5 mb-2" href="">${propertyName}</a>
        <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
    </div>
    <div class="d-flex border-top">
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
        <small class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>$district</small>
    </div>
</div>
</div>

`;
    })
    .join("");
  console.log(eachFeaturedItems);
  const featuredItemsContainer = document.querySelector(
    ".featured-items-container"
  );
  featuredItemsContainer.innerHTML = eachFeaturedItems;

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
  `;

  featuredItemsContainer.appendChild(browseMoreLink);
};

//for sale properties
const forSaleItemsDOM = () => {
  //mapping through each featuredItems array items
  const eachItemsForSale = forSaleProperties[0]
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        featuredProperty,
        propertyLocation,
      } = item.fields;
      return `
<div class="col-lg-4 col-md-6 wow fadeInUp for-sale-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a href=""><img class="img-fluid" src="img/re360-01.jpg" alt=""></a>
        <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
        <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
    </div>
    <div class="p-4 pb-0">
        <h5 class="text-primary mb-3">UGX ${priceInFigures}</h5>
        <a class="d-block h5 mb-2" href="">${propertyName}</a>
        <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
    </div>
    <div class="d-flex border-top">
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
        <small class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>$district</small>
    </div>
</div>
</div>

`;
    })
    .join("");

  const forSaleItemsContainer = document.querySelector(
    ".for-sale-items-container"
  );
  forSaleItemsContainer.innerHTML = eachItemsForSale;

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
  `;
  forSaleItemsContainer.appendChild(browseMoreLink);
};

//for rent properties
const forRentItemsDOM = () => {
  //mapping through each featuredItems array items
  const eachItemsForRent = featuredProperties[0]
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        featuredProperty,
        propertyLocation,
      } = item.fields;
      return `
<div class="col-lg-4 col-md-6 wow fadeInUp for-rent-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a href=""><img class="img-fluid" src="img/re360-01.jpg" alt=""></a>
        <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
        <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
    </div>
    <div class="p-4 pb-0">
        <h5 class="text-primary mb-3">UGX ${priceInFigures}</h5>
        <a class="d-block h5 mb-2" href="">${propertyName}</a>
        <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
    </div>
    <div class="d-flex border-top">
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
        <small class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>$district</small>
    </div>
</div>
</div>

`;
    })
    .join("");

  const forRentItemsElement = document.querySelector(
    ".for-rent-items-container"
  );
  forRentItemsElement.innerHTML = eachItemsForRent;

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
  `;
  forRentItemsElement.appendChild(browseMoreLink);
};
