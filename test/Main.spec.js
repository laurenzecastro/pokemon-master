import { mount } from "@vue/test-utils";
import Listings from "@/components/reusable/Listings.vue";
import Pagination from "@/components/Pagination.vue";

describe("Components", () => {
  it("Listings is a Vue instance", () => {
    const wrapper = mount(Listings);
    expect(wrapper.vm).toBeTruthy();
  });

  it("Pagination is a Vue instance", () => {
    let data = {
      propsData: {
        pokemonData: {
          totalPages: 5,
          currPage: 1
        }
      }
    };

    const wrapper = mount(Pagination, data);

    expect(wrapper.vm).toBeTruthy();
  });
});
